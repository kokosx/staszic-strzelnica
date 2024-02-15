import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index";

import "./index.css";
import Start from "./pages/Start";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/start",
    element: <Start />,
  },
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
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
