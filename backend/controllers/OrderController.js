const { Product, Order, LineItem, ShoppingCart } = require('../models')

class OrderController {
    //hanya untuk admin
    static async getAllOrders(req, res, next) {
        try {
            let orders = await Order.findAll({
                include: Product
            })
            res.status(200).json(orders)
        } catch (err) {
            next(err)
        }
    }
    static async create(req, res, next) {
        try {
            const id = +req.userData.id
            const { qty, ProductId } = req.body
            //buat table order
            let result = await Order.create({
                UserId: id
            })
            //membuat table line item dimana OrderId sama dengan id dari table order yang telah dibuat diatas
            let resultLine = await LineItem.create({
                OrderId: result.id,
                ProductId,
                qty,
                status: 'order'
            })
            //cari data line item dimana OrderId sama dengan id di table order yang dibuat diatas
            let resultGet = await LineItem.findOne({
                include: [Product, Order],
                where: { OrderId: resultLine.OrderId }
            })

            //mengambil data price di table product yang telah dicari diatas
            let tempPrice = resultGet.Product.price
            //mengambil data qty di table product yang telah dicari diatas
            let tempQty = resultGet.qty
            // menghitung subtotal yaitu price dikali qty
            let tempsubtotal = tempPrice * tempQty

            // menghitung discount berdasarkan jumlah qty
            let tempDiscount
            if (resultGet.qty > 2) {
                tempDiscount = (tempsubtotal * 5) / 100
            } else {
                tempDiscount = 0
            }

            //mengambil data tax di table product yang telah dicari diatas
            let tempTax = resultGet.Order.tax
            //menghitung tax yaitu subtotal dikali 10 % 
            let tempTotalTax = (tempsubtotal * tempTax) / 100
            // menghitung totalDue yaitu subtotal - discount + tax
            let totalDue = tempsubtotal - tempDiscount + tempTotalTax

            //update table order masukan data-data yang telah dihitung diatas
            let resultUpdate = await Order.update({
                subtotal: tempsubtotal,
                discount: tempDiscount,
                totalDue: totalDue,
                totalQty: tempQty,
                status: "unpaid",
            }, { where: { id: resultGet.OrderId } })

            let resultt = await Order.findOne({
                where: { id: resultLine.OrderId }
            })
            res.status(201).json(resultt)
        } catch (err) {
            next(err)
        }
    }
    //update setelah pembayaran
    static async updatePayment(req, res, next) {
        const id = +req.userData.id
        const { paymentTrasaction } = req.body
        try {
            let order = await Order.findOne({
                where: { UserId: id, status: 'unpaid' }
            })
            let result = await Order.update({
                paymentTrasaction,
                status: 'paid'
            }, {
                where: { id: order.id }
            })

            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }
    //update jika pembatalan order
    static async cancel(req, res, next) {
        try {
            const id = +req.userData.id
            //const { status } = +req.body
            let result = await Order.update({
                status: 'canceled'
            }, {
                where: { UserId: id, status: 'unpaid' }
            })
            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }

    //mengambil data semua order berdasarkan user id di access token
    static async orderByUserId(req, res, next) {
        try {
            const id = +req.userData.id
            let result = await Order.findAll({
                include: Product
            }, {
                where: { UserId: id }
            })
            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }

    //mengambil data order yang belum dibayar dan user id di access token
    static async orderUnpaid(req, res, next) {
        try {
            const id = +req.userData.id
            let result = await Order.findOne({
            }, {
                where: { UserId: id, status: 'unpaid' }
            })
            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = OrderController