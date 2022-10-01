import iphone12pro from '../images/iphone12pro.jpg'
import iphone12 from '../images/iphone12.jpg'
import galaxyS from '../images/galaxyS.png'

type Product = {
  id: number
  name: string
  desc: string
  price: string | number
  img: string
}

export const products: Array<Product> = [
  {
    id: 1,
    name: "iphone 12 pro",
    desc: "6-1 inch display",
    price: "999",
    img: iphone12pro,
  },
  {
    id: 2,
    name: "iphone 12",
    desc: "5-4 inch display",
    price: "699",
    img: iphone12,
  },
  {
    id: 3,
    name: "Galaxy S",
    desc: "6-5 inch display",
    price: "399",
    img: galaxyS,
  },
]
