import Home from "@/components/Home.vue"; 
import Register from "@/components/register.vue"; 
import Enter from "@/components/enter.vue"; 
import Password from "@/components/Password.vue"; 
import Describe from "@/components/describe.vue"; 
import Seek from "@/components/children/seek.vue"; 
import Mv from "@/components/children/mv.vue"; 
import My from "@/components/children/my.vue"; 
import Lately from "@/components/children/lately.vue"; 
import Album from "@/components/album.vue"; 
import MVpaly from "@/components/MVpaly.vue"; 
import MySong from "@/components/mySong.vue"; 

export default[
    {
      path: "/",
      name: "Home",
      component: Home,
      children:[
      {
      	 path: "/seek",
     	 name: "Seek",
     	 component: Seek
      },
      
      {
      	 path: "/mv",
     	 name: "Mv",
     	 component: Mv
      },
      {
      	 path: "/my",
     	 name: "My",
     	 component: My
      },
      {
      	 path: "/lately",
     	 name: "Lately",
     	 component: Lately
      },
      ],
      redirect:'/lately'
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/enter",
      name: "Enter",
      component: Enter
    },
    {
      path: "/password",
      name: "Password",
      component: Password
    },
    {
      path: "/describe",
      name: "Describe",
      component: Describe
    },
    {
      path: "/album",
      name: "Album",
      component: Album
    },
    {
      path: "/mvpaly",
      name: "MVpaly",
      component: MVpaly
    },
    {
      path: "/mySong",
      name: "mySong",
      component: MySong
    },
    
  ]