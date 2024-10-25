import React from 'react'
import { Link } from 'react-router-dom'
import ProfilHeader from '../../Sections/ProfilHeader'
import ProfilNav from '../../Partials/ProfilNav'
import SubmitApplication from '../../Sections/SubmitApplication'
import ProductList from '../../Sections/ProductList'

export default function Products() {
  return (
    <>
    <ProfilHeader />
        <section className="section mt-60">
        <div className="container mt-lg-3">
          <div className="row">
          <ProfilNav />
          <ProductList  />
          </div>
       
        </div>
          </section>
        </>
  )
}
