import React from 'react'
import { graphql } from 'gatsby'


import Content from '../components/Content'
import BackgroundVideo from '../components/BackgroundVideo'
import Layout from '../components/Layout'
import Accordion from '../components/Accordion'


// Export Template for use in CMS preview
export const HomePageTemplate = ({video,
  videoPoster,
  videoTitle,
  accordion,
  body }) => (
  <main className="Home">


<section className="BackgroundVideo-section section">
      {<BackgroundVideo poster={videoPoster} videoTitle={videoTitle}>
        {video && <source src={video} type="video/mp4" />}
      </BackgroundVideo>}
    </section>


    <section className="section">
      <div className="container">
        <Content source={body} />
      </div>
    </section>

    <section className="section">
      
      <div className="container">
      <h2>Our Instructors</h2>
        <Accordion items={accordion} />
      </div>
    </section>
  </main>
)

// Export Default HomePage for front-end
const HomePage = ({ data: { page } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <HomePageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default HomePage

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HomePage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        video
        videoPoster
        videoTitle
        accordion {
          title
          description
        }
      }
    }
  }
`
