import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const NotFoundPage: React.FC = () => {
  const naviagte = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      naviagte("/shoppingCart")
    }, 2000)
  })

  return (
    <div className="not-found">
      <h2>404</h2>
      <p>Page Not Found</p>
    </div>
  )
}

export default NotFoundPage
