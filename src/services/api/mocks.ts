import { rest } from "msw";

const cardData = [{
  id: "1",
  avatar: "https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  name: "Tom",
  title: "Software Developer",
  startDate: "08/19/2021",
  endDate: "12/12/2021",
  skills: [
    { name: "React" },
    { name: "Project Management"}
  ],
  available: false,
},
{
  id: "2",
  avatar: "https://images.pexels.com/photos/937483/pexels-photo-937483.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  name: "Sally",
  title: "Software Developer",
  startDate: "06/01/2021",
  endDate: "08/18/2021",
  skills: [{ name: "Angular" }],
  available: false,
},
{
  id: "3",
  avatar: "https://st4.depositphotos.com/13193658/19840/i/600/depositphotos_198409160-stock-photo-handsome-young-businessman-smartphone-leaning.jpg",
  name: "Paul",
  title: "Visual Designer",
  startDate: "08/19/2021",
  endDate: "12/12/2021",
  skills: [
    { name: "Design" },
    { name: "Frontend" }
  ],
  available: false,
},
{
  id: "4",
  avatar: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  name: "Stephanie",
  title: "UX",
  startDate: "08/19/2021",
  endDate: "12/12/2021",
  skills: [
    { name: "UX" },
    { name: "Project Management" }
  ],
  available: true,
}]


export default [
  rest.get("/v1", (req, res, ctx) => {
    const id = req.url.searchParams.get("id");

    return res(
      ctx.status(200),
      ctx.json({
        data: id !== "undefined" && cardData,
      }),
    );
  }),
];
