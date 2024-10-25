import React from 'react'
import { Link } from 'react-router-dom'
import ProfilHeader from '../../Sections/ProfilHeader'
import ProfilNav from '../../Partials/ProfilNav'
import CategoryList from '../../Sections/CategoryList'

export default function Category() {
  return (
    <>
    <ProfilHeader />
        <section className="section mt-60">
        <div className="container mt-lg-3">
          <div className="row">
          <ProfilNav />
          <CategoryList  />
          </div>
       
        </div>
          </section>
        </>
  )
}
