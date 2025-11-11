import { useEffect, useState } from "react";
const BASE_URL = "https://embedtechnolozix.com/api";


export const useCategory = () => {
  const [categories, setCategory] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/categories.php`)
      .then(res => res.json())
      .then(data => {
      setCategory(data);
      })
      .catch(err => console.error("Error loading products:", err));





  }, []);
// console.log(categories);
  return categories;
};


export const ServicesCollections = () => {
  const [Services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/get_services.php`)
      .then(res => res.json())
      .then(data => {
      setServices(data);
      })
      .catch(err => console.error("Error loading products:", err));





  }, []);
// console.log(Services);
  return Services;
};
export const getBlog = (id) => {
  const [Blog, setBlog] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/get_blog.php?id=${id}`)
      .then(res => res.json())
      .then(data => {
      setBlog(data);
      })
      .catch(err => console.error("Error loading products:", err));





  }, []);
// console.log(Blog);
  return Blog;
};




export const testimonials = [
  {
    id: 1,
    name: "Mohit Singh",
    role: "Electrical Engineer",
    content: "EmbedTechnolozix has been my go-to for all electronic components. Their Arduino selection is unmatched, and the shipping is always fast and reliable.",
    avatar: "/avatar-1.jpg"
  },
  {
    id: 2,
    name: "Amit Chouan",
    role: "Robotics Enthusiast",
    content: "I've been building robots for years, and EmbedTechnolozix consistently provides the highest quality sensors and microcontrollers. Their technical support is also excellent!",
    avatar: "/avatar-2.jpg"
  },
  {
    id: 3,
    name: "Ajay Singal",
    role: "IoT Developer",
    content: "As someone who works on IoT projects daily, having a reliable supplier is crucial. EmbedTechnolozix delivers every time with quality products and great documentation.",
    avatar: "/avatar-3.jpg"
  }
];