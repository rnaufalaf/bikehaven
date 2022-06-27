const { ShoppingCart, User, LineItem, Product, Order } = require('../models')

class ShoppingCartController{
    static async getAllShoppingCarts (req, res, next){
        try{
            let carts = await ShoppingCart.findAll({
                include : User
            })
            res.status(200).json(carts)
        } catch(err){
            next(err)
        }
    }
    static async getCartByUserId (req,res, next){
        const id= +req.userData.id
        try {
            let getCart = await ShoppingCart.findAll({
                where: { UserId:id }
            })
            res.status(200).json(getCart)
        } catch(err){
            next(err)
        }
    }
    static async addToCart(req, res, next) {
        try {
            const id = +req.userData.id
            const {  qty, ProductId } = req.body;

            // cari keranjang yang open
            const shoppingCart = await ShoppingCart.findOne({
                where: { status: "open", UserId:id }
            })

            // masukkan product ke keranjang
            let result = await LineItem.create({
                ShoppingCartId: shoppingCart.id,
                ProductId,
                qty,
                status: "cart" 
            })
            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }
    static async checkout(req, res, next) {
        try {
            const id = +req.userData.id
            
            const shoppingCart = await ShoppingCart.findOne({
                where: { status: "open", UserId: id }
            })

            const lineItems = await LineItem.findAll({
                include: Product,
                where: {ShoppingCartId:shoppingCart.id}
            })
            //menghitung total qty dan subtotal
            let totalQty = 0;
            let subtotal = 0;
            lineItems.forEach(lineItem => {
                totalQty = totalQty+lineItem.qty
                subtotal = subtotal + (lineItem.qty*lineItem.Product.price)
            })
            //  console.log(subtotal)
            //  console.log(totalQty)

            let discount
            if ( totalQty > 2 ){
                discount = (subtotal * 5) / 100
            } else{
                discount = 0
            }
            // console.log(discount)
            let totalDiscount = subtotal - discount
            // console.log(totalDiscount)

            let totalTax = (subtotal * 10) /100
            // console.log(totalTax)
            let totalDue = totalDiscount + totalTax
            // console.log(totalDue)
            let order = await Order.create({
                subtotal: subtotal,
                discount: discount,
                totalDue: totalDue,
                totalQty: totalQty,
                status:'unpaid',
                UserId: id
            })
            // console.log(order)
            let update = await LineItem.update({
                status:'order',
                OrderId: order.id,
            },{where:{ShoppingCartId:shoppingCart.id}})

            await ShoppingCart.update({
                status: 'close'
            }, {
                where: {status:'open',UserId:id}
            })

            res.status(201).json(update)
        } catch (err) {
            next(err)
        }
    }
}
module.exports = ShoppingCartController