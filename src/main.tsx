import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index";

import "./index.css";
import Start from "./pages/Start";
import Training from "./pages/Training";
import SetProvider from "./SetProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/start",
    element: <Start />,
  },
  { path: "/training", element: <Training /> },
]);

console.log(`
:::    ::: ::::::::  :::    ::: ::::::::   ::::::::  
:+:   :+: :+:    :+: :+:   :+: :+:    :+: :+:    :+: 
+:+  +:+  +:+    +:+ +:+  +:+  +:+    +:+ +:+        
+#++:++   +#+    +:+ +#++:++   +#+    +:+ +#++:++#++ 
+#+  +#+  +#+    +#+ +#+  +#+  +#+    +#+        +#+ 
#+#   #+# #+#    #+# #+#   #+# #+#    #+# #+#    #+# 
###    ### ########  ###    ### ########   ########  
`);

ReactDOM.createRoot(document.getElementById("root")!).render(
  //<React.StrictMode>
  <SetProvider>
    <RouterProvider router={router} />
  </SetProvider>
  //</React.StrictMode>
);
