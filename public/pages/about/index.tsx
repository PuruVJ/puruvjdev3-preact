import { RoutableProps, RouteProps } from "preact-iso/router";
import styles from "./style.module.css";

export const About = ({ path }: RouteProps<{}>) => (
  <section class={styles.about}>
    <h1>About</h1>
    <p>A page all about this website.</p>
    <pre>{JSON.stringify(path)}</pre>
  </section>
);
