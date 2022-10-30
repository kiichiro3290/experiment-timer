import Link from "next/link";
import Layout from "../components/Layout";

const AboutPage = () => (
  <>
    <Layout title="About | Next.js + TypeScript + Electron Example">
      <h1>About</h1>
      <p>This is the about page</p>
      <Link href="/">
        <p>Go home</p>
      </Link>
    </Layout>
  </>
);

export default AboutPage;
