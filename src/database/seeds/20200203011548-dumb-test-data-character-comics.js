"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "Characters",
      [
        {
          id: 1,
          name: "Groot",
          thumbnail:
            "https://i1.pngguru.com/preview/284/407/728/i-am-groot-png-clipart.jpg",
          description: "I am Groot",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 2,
          name: "Iron Man",
          thumbnail:
            "https://w0.pngwave.com/png/835/340/iron-man-spider-man-coloring-book-drawing-iron-man-png-clip-art.png",
          description: "Billionaire playboy philanthropist genius",
          created_at: new Date(),
          updated_at: new Date()
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Comics",
      [
        {
          id: 5016,
          title: "Avengers: The Initiative (2007) #15",
          thumbnail:
            "https://i1.pngguru.com/preview/284/407/728/i-am-groot-png-clipart.jpg",
          description: "The fates of The Initiative, the United States, and Planet Earth hang in the balance. Plus: Former Avenger, Delroy Garret, assumes the mantle and arsenal of Earth's greatest Skrull-Hunter, The 3-D Man.",
          variant_description: "Another avengers story",
          page_count: 50,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 5017,
          title: "Avengers: The Initiative (2007) #14",
          thumbnail:
            "http://i.annihil.us/u/prod/marvel/i/mg/c/80/4bc5fe7a308d7.jpg",
          description: "The fates of The Initiative, the United States, and Planet Earth hang in the balance. Plus: Former Avenger, Delroy Garret, assumes the mantle and arsenal of Earth's greatest Skrull-Hunter, The 3-D Man.",
          variant_description: "I am Groot",
          page_count: 30,
          created_at: new Date(),
          updated_at: new Date()
        },
      ],
      {}
    );

    return queryInterface.bulkInsert(
      "CharacterComics",
      [
        {
          comic_id: 5016,
          character_id: 1
        },
        {
          comic_id: 5016,
          character_id: 2
        },
        {
          comic_id: 5017,
          character_id: 2
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Characters', null, {});
    await queryInterface.bulkDelete('Comics', null, {});
    return queryInterface.bulkDelete('CharacterComics', null, {});
  }
};
