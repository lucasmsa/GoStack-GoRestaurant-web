# GoStack Challenges 📃
> GoStack is an 8-week Bootcamp from [RocketSeat](https://rocketseat.com.br/) that is mainly focused on teaching NodeJS, ReactJS, React-Native and 
 Typescript
 
 * Challenge description: https://git.io/JJA0c
 * Test Results on `Jest_Results.png`
 
<br>

## Challenge

- [x]  List every food on the `Dashboard` page, each food should contain the fields `title`,`value`, `description` and `available`
    - [x]  To the `available` field, it should check the `available` field from the API and return `Disponível` if it's true and `Indisponível` if it's false
- [x]  Add new `food` to the API, on the `Dashboard` page the `+` button should allow the user to create a new `food` passing the fields `image`, `name`, `description` and `value`
    - [x]  `image` field must be an URL
    - [x]  When sending the request to the API to create a new `food` always remember to set the field `available` to true
- [x]  Edit `food`, on the `Dashboard` page when the button `✏️` gets clicked, it should allow the user to edit `image`, `name`, `description` and `value` of a given food
    - [x]  When sending the update request to the API, copy the old values of `available` and `id` or the data will be lost

- [x]  Remove `food` from the API, on the `Dashboard` page if the trash button gets clicked the `food` should be removed from the API
    - [x]  After removing the item from the API remember to remove it from the list
- [x]  Alter the available atribute of `food` from the API, on the `Dashboard` page, after clicking the `available` switch, it should alter the `available` atribute item from the API
