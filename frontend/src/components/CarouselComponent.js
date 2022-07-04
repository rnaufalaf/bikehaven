import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const dummyImg = [
  {
    image:
      "https://cdn.pixabay.com/photo/2015/05/29/19/18/bicycle-789648_960_720.jpg",
    label: "Everything for your biking needs, all in one place!",
  },
  {
    image:
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    label:
      "Find your desired bike parts here, whether it's new or used but still durable",
  },
  {
    image:
      "https://images.unsplash.com/photo-1602148740250-0a4750e232e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    label: "Your used bike parts might be useful for anyone else!",
  },
];

const CarouselComponent = () => {
  return (
    <>
      <Carousel
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={3000}
        infiniteLoop={true}
      >
        {dummyImg.map((img, index) => {
          return (
            <div key={index}>
              <img
                className="object-cover"
                alt=""
                src={img.image}
                style={{ maxHeight: "80vh" }}
              ></img>
              <p
                className="legend"
                style={{
                  padding: 10,
                  backgroundColor: "rgba(255, 255, 255, 0.81)",
                  color: "rgba(0, 0, 0, 1)",
                  fontWeight: "bold",
                  fontSize: 18,
                  borderRadius: "0.375rem",
                }}
              >
                {img.label}
              </p>
            </div>
          );
        })}
      </Carousel>
    </>
  );
};

export default CarouselComponent;
