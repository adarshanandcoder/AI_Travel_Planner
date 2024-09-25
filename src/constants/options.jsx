export const SelectTravelsList =[
    {
        id:1,
        title:'Just Me',
        desc:'A sole traveller in exploration',
        icon :'🧑',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two Travellers in Tandom',
        icon :'💑',
        people:'2 People'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of adv people',
        icon :'👨‍👩‍👦‍👦',
        people:'3 to 6 People'
    },
    {
        id:4,
        title:'Friends',
        desc:'A group of fun-lovers',
        icon :'🤝',
        people:'5 to 10 People'
    },
]

export const SelectBudgetOptions = [
    {
        id:1,
        title:'Cheap',
        desc:'Be mindful of expenses',
        icon:'💵'
    },
    {
        id:2,
        title:'Moderate',
        desc:'Maintain moderate expenses',
        icon:'💰'
    },
    {
        id:3,
        title:'Luxurious',
        desc:"Cost doesn't matter",
        icon:'💳'
    },
]

export const AI_PROMPT = 'Generate Travel Plan for location : {location}, for {noOfDays} days for {people} with a {budget} budget, Give me a hotels options list with hotel name, hotel address, price , hotel image url, geo coordinates, rating, descriptions and suggest itinerary with place name, place details, place image url, geo coordinates, ticket pricing, Time to travel each of the location for {noOfDays} days with each day plan with best time to visit in JSON format.'