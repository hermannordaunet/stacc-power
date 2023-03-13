# My submission for the Future of Fintech Spring 2023 challenge!

## ⚡ Electricity ⚡

### As you guys perfectly described:

*"For the past year and a half, electricity prices have been soaring, and it affects us all. To help save on prices, people have quickly become much more conscious about their usage."*
 
The problem of reducing your power bill is, as you said, a two-faced problem. I tried to put focus on choosing the **best** power provider for individual users. Since no one has the same everyday life, the choice of a pricing model that gives each individual the lowest power bill is not easy. 

My approach was that I want to create a lot of API endpoints that can be used in various ways. Both to present the data we have from the users' power consumption, providers, and their pricing model and to create some endpoints that numerically analyze the users' data, calculate some prices of the usage based on the different providers, and some endpoints to compare different providers using the users' data. 

By using the data given to us, we can compute how different pricing models fit the user based on their real life consumption. I think this is a good way to give the average people more insight into their power bill and motivate them to change the provider if they see that another provider can offer them a lower power bill based on their real consumption and not just what the media and other providers tell them.

There are many different ways if determining if a provider is good or bad. Not just the pricing and monthley fees, but also how they get their energy. Since I could not find a good API to get the the distribution of where the power originates from I desided to go for the classification of which provider is cheaper for the user. If I had found this information I think this would be a good thing to present to the user. Many people like to know that the power they are getting is 100% clean. 

Other things that can help users when looking at the data we present is to show how the weather was at the given time. I tried to also create a usable endpoint to get some weather data from data I found. 

In my approach I tried to create a backend by making a lot more endpoints in the API folder that were already in the project. I just git cloned the repo and ended up using this as a base. I have no experience in frontend, so I tried to make use of my knowledge in the backend. I also like to do some design to get an idea of how my backend could be used. So that is why I also tried to make a Figma design on how this data that my backend extracts can be presented to the user. 

# Design
I tried to create a website using Figma that can show how the API endpoints can be used to give the customer more and easier information on how the power bill can be lowered based on their consumption data. A local file copy can be found [here](/design/), named **Stacc-power-stuff.fig**.

# API

## Starting point

Since I used the same **how to run** and codebase as your provided this is the same for my code. I also got the code running using [Vercel](https://stacc-power.vercel.app/). Here you can add /api/ behind to get access to all the same API's as the local one. There are some weird error when passing the wrong query on the range endpoints. But it works if the format is correct. 

## Data

In the data folder I kept the two json files that you already provided, but I added some files and changed one of the files:
- **spot.json** # all the spotprices in norway in the same time range we had consumption data from. Downloaded from [Strømpris.no](https://www.strompris.no/spotpriser)
- **weather.json** # weather data from the same time range as we had for the consumption data. Downloaded from [Open-Meteo](https://open-meteo.com/en/docs)
</br>
- **providers.json** # I changed the names and the prices with some known providers and some prices I found online.


## Endpoints

This is were I used most of my knowledge to create good endpoint so that the data we got provided could be used to create more explainable data to the user. 

### Data
First I wanted to create some base points to get all the data I have collected, and I also kept the two that were already implemented:

`/api/weather`  
`/api/spot`

### Consumption

Then I wanted to create endpoint were the frontend developer can get the consumption data sliced into more usable sizes:

`/api/consumption/hour`  
`/api/consumption/day`  
`/api/consumption/week`  
`/api/consumption/month`  
`/api/consumption/year`  
`/api/consumption/range`  
`/api/consumption/total`  

All these endpoint (except range and total) should end with /YYYY-MM-DDTHH. For example

`/api/consumption/hour/2023-01-02T15`

All these endpoints returns the filteredData, totalConsumption and the query used to get the data. 
For the range endpoint the query needs to be:
 
`/api/consumption/range/YYYY-MM-DDTHH/YYYY-MM-DDTHH`
 
In the local API I got the error messages to work when passing the wrong format. But the vercel app did not work. 

The `/api/consumption/total` is needs no query and only returns the sum of all the consumption on the provided data.

### Stats
In these endpoints I just wanted to get the idea of using the data we already have to either predict the power consumption for the given user, or use the given data to give the user som feedback on how and when the most power is consumed. I did not get to look to much into this, but I really wanted to be able to run some machine learning on this. Looking into machine learning and javascript I abonded the idea for now. But these to endpoint can give some cool data that might be interesting to some users. 

`/api/stats/day`  
`/api/stats/hour`

Both of these use the same time format as previous endspoints. 

`/api/stats/hours` has some cool values calulated for every hour in a day given the data in **consumption.json**

### Spot

`/api/consumption/hour`  
`/api/consumption/day`  
`/api/consumption/week`  
`/api/consumption/month`  
`/api/consumption/year`  
`/api/consumption/range`  

All of these use the same time format as previous endspoints. 
It returns the spot price for NO1-NO5. This can be useful because a lot of costumers does not even know what the spotprice is at a given time. 

### Weather

`/api/weather/`  
  
This endpoint can return the weather for a given time. In the data there are the temperature and the wind speed. There could be more data, but I just tried to get some data to begin with. 

The endpoint takes **/YYYY-MM-DDTHH** as the query. 

### Comparison

Now for the one API that will be the most useful to give the costumer knowledge of the price they pay, and where they can save money. 

`/api/comparison/hour`  
`/api/comparison/day`  
`/api/comparison/week`  
`/api/comparison/month`  
`/api/comparison/year`  
`/api/comparison/range`  
`/api/comparison/total`  


These endpoint work the same way as the consumption. 
The API returns these types of data:


```
{
    "startDate": "2023-01-01T00",
    "endDate": "2023-01-02T00",
    "spotPriceByNO": {
        "NO1": 10895.093,
        "NO2": 10895.093,
        "NO3": 5556.485,
        "NO4": 2552.178,
        "NO5": 10898.026
    },
    "totalConsumption": 75.232,
    "providerPrices": {
        "Volte": {
            "pricingModel": "fixed",
            "monthlyFee": 3900,
            "fixedPrice": 215.6,
            "fixedPricePeriod": 12,
            "companyPriceFixed": 16220.019
        },
        "Agva": {
            "pricingModel": "fixed",
            "monthlyFee": 4900,
            "fixedPrice": 294.9,
            "fixedPricePeriod": 3,
            "companyPriceFixed": 22185.917
        },
        "Motkraft": {
            "pricingModel": "spot-hourly",
            "monthlyFee": 2900,
            "prKwhFee": 2,
            "companyPriceByNO": {
                "NO1": 11045.557,
                "NO2": 11045.557,
                "NO3": 5706.949,
                "NO4": 2702.642,
                "NO5": 11048.49
            }
        },
        "Fjordkraft": {
            "pricingModel": "spot-hourly",
            "monthlyFee": 4900,
            "prKwhFee": 4.9,
            "companyPriceByNO": {
                "NO1": 11263.73,
                "NO2": 11263.73,
                "NO3": 5925.122,
                "NO4": 2920.815,
                "NO5": 11266.663
            }
        }
    }
}
```

In this json we have information on how much the money the customer have used in terms of just the spotprice, and how much they have used if they had the different providers. A lot of people does not know how much they pay per kWh to the provider, so to present this number with and without the providers fee should make people more aware of how much they pay the provider for the power they use. 


## How to deliver

### Important!

> We advise you to be conscious about how your work can be assessed. Make it simple to access, run, and review. 😊

> We can only review work that we can run, so make sure to package dependencies, include instructions, etc.

> If you are able to host your system in any form, please do! ([Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), [Heroku](https://www.heroku.com/home) and [Github Pages](https://pages.github.com/) are some great free hosting alternatives)

### Design/UX

1. Somewhere where your sketch is stored. This can be a link to a Figma-, XD-, or sketch document or a set of pictures.
2. Feel free to supplement with something that explains what you have designed, why you designed it like that and what you might have improved upon if you were to do it differently or had more time. 🕒 These can also be embedded directly into your design document if your design software supports it.
3. [ Send it to challenge@stacc.com 📬 ](mailto:challenge@stacc.com)

### Code

1. We prefer to have your work published as a **public git repository**.
2. If you do not want your work to be public then please contact us so that you can share it with your reviewers directly.
3. You need to include an _readme.md_ file that details some basic information about your project.  
   [The template can be found here](https://github.com/stacc/stacc-challenge-public/blob/main/readme.md.template)
4. We also strongly suggest that you make an assessment of how your application can be run on other systems.
5. [ Send it to challenge@stacc.com 📬 ](mailto:challenge@stacc.com)
