import userModel from "../models/userModel.js"

// add to user cart  
const addToCart = async (req, res) => {
   try {
      let userData = await userModel.findById(req.body.userId);
      let cartData = await userData.cartData;
      if (!cartData[req.body.itemId]) {
         cartData[req.body.itemId] = 1;  //if product entry is not in the cartData and and user with userid will come then it will mark 1.
      }
      else {
         cartData[req.body.itemId] += 1;  //if already present.
      }
      await userModel.findByIdAndUpdate(req.body.userId, {cartData});  //find in database.
      res.json({ success: true, message: "Added To Cart" });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" })
   }
}

// remove food from user cart
const removeFromCart = async (req, res) => {
   try {
      let userData = await userModel.findById(req.body.userId);
      let cartData = await userData.cartData;
      if (cartData[req.body.itemId] > 0) {  //item must be exist so that i can remove.
         cartData[req.body.itemId] -= 1;
      }
      await userModel.findByIdAndUpdate(req.body.userId, {cartData}); //new cart data is updated.
      res.json({ success: true, message: "Removed From Cart" });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" })
   }

}

// get user cart
const getCart = async (req, res) => {
   try {
      let userData = await userModel.findById(req.body.userId);  //req.body.userId given by middleware.
      let cartData = await userData.cartData;
      res.json({ success: true, cartData:cartData });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" })
   }
}


export { addToCart, removeFromCart, getCart }