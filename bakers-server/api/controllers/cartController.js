
// }

const Carts = require("../models/Carts");

// Fetch Cart by Email
const getCartByEmail = async (req, res) => {
    try {
        const email = req.query.email;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const query = { email: email };
        const result = await Carts.find(query).exec(); // Use find() to get all items for the user

        if (!result || result.length === 0) {
            return res.status(404).json({ message: "No cart found for this email." });
        }

        res.status(200).json(result); // Return the found cart items
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: error.message });
    }
};

// Add item to cart
const addToCart = async (req, res) => {
    const { menuItemId, name, recipe, image, price, quantity, email } = req.body;

    try {
        // Validate required fields
        if (!menuItemId || !name || !price || !quantity || !email) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check if the item is already in the user's cart
        const existingCartItem = await Carts.findOne({ menuItemId, email });
        
        if (existingCartItem) {
            // If the item exists, update the quantity
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            return res.status(200).json(existingCartItem); // Return updated item
        }

        // If not, create a new cart item
        const cartItem = new Carts({
            menuItemId, name, recipe, image, price, quantity, email
        });

        await cartItem.save();
        res.status(201).json(cartItem); // Return newly created item
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: error.message });
    }
};

const deleteCart=async(req,res)=>{
    const cartId=req.params.id;
    try{
        const cart=await Carts.findByIdAndDelete(cartId);
        if(!cart){
            return res.status(401).json({ message: "Cart Items not found." });
        }
        res.status(200).json({message:"Cart item deleted Successfully"})
    } catch(error){
        res.status(500).json({message:error.message});
    }
}

//update cart item
const updateCart=async(req,res)=>{
    const cartId=req.params.id;
    const {menuItemid,name,recipe,image,price,quantity,email}=req.body;
    try{
        const updatedCart=await Carts.findByIdAndUpdate(
            cartId,{menuItemId,name,recipe,image,price,quantity,email},{
                new:true,runValidators:true,
            }
        )
        if(!updatedCart){
            return res.status(404).json({message:"cart Item is not found"})
        }
        res.status(200).json(updatedCart)

    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

//get single recipe
const getSingleCart=async(req,res)=>{
    const cartId=req.params.id;
    try{
        const cartItem=await Carts.findById(cartId).populate("menuItemid");
        res.status(200).json(cartItem)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

module.exports = {
    getCartByEmail,
    addToCart,
    deleteCart,updateCart,getSingleCart
};
