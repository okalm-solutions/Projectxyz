import Link from "next/link";
import styles from "../../styles/Projects.module.css";
import Card from "../../components/Card";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imageUrlBuilder from "@sanity/image-url";
import { useEffect, useState } from "react";
// import { sanityClient } from "../../lib/sanity-client/client";
import { getprojectsData } from "../../lib/projectsData";
// import { projectsData } from "../../data/index";

export async function getStaticProps(context) {
  const projectsData = await getprojectsData(); 
  return {
    props: {
      projects: projectsData,
    },
  };
}

const Projects = (props) => {
  const [mappedProjects, setMappedProjects] = useState("");

  useEffect(() => {
    const imgBuilder = imageUrlBuilder({
      projectId: "xhim8nbd",
      dataset: "production",
    });

    setMappedProjects(
      props.projects.map(project=>{
        return {
          ...project,
          image: imgBuilder.image(project.image).width(500).height(250)
        }
      }
    ));
    console.log(mappedProjects)
  }, [mappedProjects, props.projects]);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/">
          <a>
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{ fontSize: "1.5rem" }}
            />
          </a>
        </Link>
        <h1>Projects</h1>
      </header>
      <main className={styles.content}>
        {mappedProjects && mappedProjects.map((prj, idx) => {
          return (
            <Card
              key={prj.name}
              title={prj.name}
              description={prj.description}
              img={prj.image}
            />
          );
        })}
      </main>
    </div>
  );
};

export default Projects;
