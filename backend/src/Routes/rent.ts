import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createPostInput, updatePostInput } from "@subal999/homerent-package"



export const RentRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string;
  }
}
>();


RentRouter.use("/*", async (c, next) => {

  const authHeader = c.req.header('Authorization') || ""
  const token = authHeader.split(' ')[1] || ""
  try {
    const user = await verify(token, c.env.JWT_SECRET);

    if (user && user.id) {
      c.set('userId', user.id as string);

      await next();
    } else {

      return c.json({ error: 'Unauthorized' }, 401)

    }
  } catch (e) {

    return c.json({ error: 'Unauthorized' }, 401)
  }
})


RentRouter.post('/upload', async (c) => {
  const body = await c.req.parseBody()
  const file = body.file

  if (!(file && file instanceof File)) {
    return c.json({ error: 'No file uploaded' }, 400)
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'HomeRentPreset') // your unsigned preset

  const res = await fetch('https://api.cloudinary.com/v1_1/dywxaimsh/image/upload', {
    method: 'POST',
    body: formData
  })

  const data = await res.json()
  return c.json(data as any)

})



RentRouter.post("/listing", async (c) => {

  const body = await c.req.json();

  const userId = c.get('userId');

  if (!userId) {
    return c.text("Unauthorized", 401);
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const parsed = createPostInput.safeParse(body);
  if (!parsed.success) {
    return c.json({
      error: parsed.error.format()

    }, 400);
  }

  const {

    type,
    rooms,
    bathrooms,
    gender,
    description,
    price,
    location,
    category,
    photos
  } = parsed.data;

  const listing = await prisma.listing.create({
    data: {
      ownerId: userId,
      type,
      gender,
      rooms,
      bathrooms,
      description,
      price,
      location,
      category,
      photos: {
        create: photos.map((url: string) => ({ url })),

      },

    },
    include: { photos: true },

  });

  return c.json({ message: "Post created", listing });
});

// RentRouter.put('/update', async (c) => {
//   const body = await c.req.json()
//   const { success } = updatePostInput.safeParse(body)
//   if (!success) {
//     return c.json({
//       msg: "Invalid input"
//     }, 400)
//   }
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate())
//   const blog = await prisma.post.update({
//     where: {
//       id: body.id,
//     },
//     data: {
//       title: body.title,
//       content: body.content,

//     }
//   })

//   return c.json({
//     id: blog.id
//   });

// })


RentRouter.get('/bulk', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try {
    const rent = await prisma.listing.findMany({
      select: {
        id: true,
        photos: {
          select: {
            url: true,
          }
        },
        rooms: true,
        location: true,
        type: true,
        bathrooms: true,
        category: true,
        description: true,
        price: true,




      }
    });
    return c.json({
      rent
    });
  } catch (error) {
    c.status(404)
    return c.json({
      error: "rent not found"
    })
  }

})


RentRouter.get('/search', async (c) => {
  
  const url = new URL(c.req.url)
  
  const filter = url.searchParams.get('filter') || ''
  if (!filter) {
    return c.json({ users: [] }, 200); 
  }
   const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());


 const users = await prisma.listing.findMany({
    where: {
      OR: [
        {
          location: {
            contains: filter,
            mode: 'insensitive',
          },
        },
    
      ],
    },
    include: {
      photos: true,
    },
  });

  return c.json({
    users: users.map((user) => ({
      id: user.id,
      photos: user.photos.map(photo => photo.url),
      rooms: user.rooms,
      location: user.location,
      type: user.type,
      bathrooms: user.bathrooms,
      category: user.category,
      description: user.description,
      price: user.price,
    })),
  }, 200);
})

RentRouter.get('/:id', async (c) => {
  
  const id = Number(c.req.param("id"));
  if (isNaN(id)) {
    c.status(400);
    return c.json({ error: "Invalid ID" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try {
    const rentdetails = await prisma.listing.findFirst({
      where: {
        id: id,
      }, select: {
        photos: {
          select: {
            url: true,
          }
        },
        ownerId: true,
        type: true,
        gender: true,
        rooms: true,
        bathrooms: true,
        description: true,
        price: true,
        location: true,
        category: true,
      }

    })
    return c.json({
      rentdetails
    });


  } catch (error) {
    c.status(404)
    return c.json({
      error: "rent details not found"
    })
  }
})

RentRouter.post('/username', async (c) => {

  const authorId = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try {
    const rent = await prisma.user.findUnique({
      where: {
        id: authorId,
      },
      select: {
        name: true,
      }


    })
    if (!rent) {
      c.status(404)
      return c.json({
        error: "rent not found"
      })
    }
    return c.json({
      rent
    });


  } catch (error) {
    c.status(404)
    return c.json({
      error: "rent not found"
    })
  }
})


RentRouter.delete('/delete/:id', async (c) => {
  

  const id = Number(c.req.param("id"))
  if (isNaN(id)) {
    c.status(400);
    return c.json({ error: "Invalid ID" });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try {
    await prisma.listing.delete({
      where: {
        id: id,
      }
    })
    return c.json({
      msg: "Rent deleted"
    });


  } catch (error) {
    c.status(404)
    return c.json({
      error: "Rent not found"
    })
  }
})

RentRouter.post("/admin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const userId = c.get('userId');
  if (!userId) {
    return c.text("Unauthorized", 401);
  }
  try {
    const rent = await prisma.listing.findMany({
      where: {
        ownerId: userId,
      },
      select: {
        photos: {
          select: {
            url: true,
          }
        },
        ownerId: true,
        type: true,
        gender: true,
        rooms: true,
        bathrooms: true,
        description: true,
        price: true,
        location: true,
        category: true,

      }


    })
    return c.json({
      rent
    });
  } catch (error) {
    c.status(404)
    return c.json({
      error: "rent not found"
    })
  }
}
)

RentRouter.put('/update/:id', async (c) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) {
    c.status(400);
    return c.json({ error: "Invalid ID" });
  }

  const userId = c.get('userId');
  if (!userId) {
    return c.text("Unauthorized", 401);
  }

  const body = await c.req.json();
  const parsed = updatePostInput.safeParse(body);
  console.log(parsed)
  if (!parsed.success) {
    return c.json({ error: parsed.error.format() }, 400);
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const existing = await prisma.listing.findUnique({
      where: { id },
    });

    if (!existing || existing.ownerId !== userId) {
      return c.json({ error: "Not authorized or listing not found" }, 403);
    }

    const {

      type,
      gender,
      rooms,
      bathrooms,
      description,
      price,
      location,
      category,
      photos
    } = parsed.data;

    const updated = await prisma.listing.update({
      where: { id },
      data: {
        type,
        gender,
        rooms,
        bathrooms,
        description,
        price,
        location,
        category,
        photos: {
          deleteMany: {},
          create: photos.map((url: string) => ({ url })),
        },
      },
      include: { photos: true },
    });

    return c.json({ message: "Listing updated", updated });
  } catch (error: any) {
  console.error("Update Error:", error?.message || error);
  return c.json({ error: "Failed to update listing" }, 500);
}

});



RentRouter.post("/option", async (c) => {
  const body = await c.req.json();
  const budget = body.price        // e.g., '₹1001 - ₹3000'
  const bedrooms = body.rooms     // e.g., '2 BHK'
  const category = body.category     // e.g., 'Single Room'
  const cleanBudget = budget?.trim().replace(/\s+/g, ""); // removes all spaces
  console.log("BODY:", body);
console.log("Raw budget:", body.price);
console.log("Clean budget:", cleanBudget);
console.log("Bedrooms:", bedrooms);
console.log("Category:", category);



  const whereClause: any = {};

  // 💰 Budget logic

  if ( cleanBudget) {
    console.log("Budget");
    switch (cleanBudget) {
      case "₹500-₹1000":
        whereClause.price = { gte: 500, lte: 1000 };
        break;
      case "₹1001-₹3000":
        whereClause.price = { gte: 1001, lte: 3000 };
        break;
      case "₹3001-₹5000":
        whereClause.price = { gte: 3001, lte: 5000 };
        break;
      case "₹5001-₹7000":
        whereClause.price = { gte: 5001, lte: 7000 };
        break;
      case "₹7000andabove":
        whereClause.price = { gt: 7000 };
        break;
    }
  }

if (bedrooms) {
  console.log("Bedrooms");

  // If user selects "4+ BHK", match any "4 BHK", "5 BHK", etc. (optional advanced logic)
  if (bedrooms === "4+ BHK") {
    whereClause.rooms = {
      contains: "BHK",
      mode: "insensitive"
    };
  } else {
    
    whereClause.rooms = {
      equals: bedrooms,
      mode: "insensitive"
    };
  }
}


  if (category) {
    console.log("Category");
    whereClause.category = {
      equals: category,
      mode: "insensitive", // case-insensitive match
    };
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  console.log("Where Clause:", whereClause);
  const listings = await prisma.listing.findMany({
    where: whereClause,
  });

  return c.json({ listings });
});


