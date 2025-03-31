import { JSX, ReactNode} from "react";

export interface Route{
    path:string;
    name:string;
    children?:Route[];
    component?:ReactNode;
}

export interface RouteConfig {
    mainNav: Route[];
    secondNav: Route[];
}