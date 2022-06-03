/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import IRoute from "./interfaces/route.interface";
import Dashboard from "./Dashboard";
import { Root } from '../components/Root';
import HomePage from "./HomePage";
import Tutorials from "./Tutorials";

const routes: IRoute[] = [
  {
    path: '/',
    exact: false,
    component: Root,
    index: 1,
    name: 'Blank IDE',
    protected: false
  },
  {
    path: '/ide',
    exact: false,
    component: Root,
    index: 1,
    name: 'Blank IDE',
    protected: false
  },
  {
    path: '/dashboard',
    exact: true,
    component: Dashboard,
    name: 'Dashboard',
    protected: true
  },
  {
    path: '/sim',
    exact: true,
    component: Root,
    name: 'Simulator',
    protected: true
  },
  {
    path: '/ide',
    exact: true,
    component: Root,
    name: 'Wombat IDE',
    protected: true
  },
  {
    path: '/tutorials',
    exact: true,
    component: Tutorials,
    name: 'Tutorials',
    protected: true
  },

];
export default routes;