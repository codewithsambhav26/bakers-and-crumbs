const Menu=require("../models/Menu")
const getAllMenuItems=async(req,res)=>{
    try{
        const menus=await Menu.find({}).sort({createdAt:-1});
        res.status(200).json(menus)
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

// post a new menu item
const postMenuItem=async(req,res)=>{
    const newItem=req.body;
    try{
        const result=await Menu.create(newItem);
        res.status(200).json(result)
    }catch(error){
        res.status(500).json({message:error.message});
    }
}


const deleteMenuItem = async (req, res) => {
    const menuId = req.params.id;
    console.log(`Received ID for deletion: ${menuId}`); // Log the received ID
  
    // Check if the ID is a valid MongoDB ObjectId
    if (!menuId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
  
    try {
      const deletedItem = await Menu.findByIdAndDelete(menuId);
      console.log(`Deleted item: ${deletedItem}`); // Log the deleted item
  
      if (!deletedItem) {
        return res.status(404).json({ message: "Item not Found" });
      }
      res.status(200).json({ message: "Menu Item Deleted Successfully!" });
    } catch (error) {
      console.error(`Error deleting item with ID ${menuId}: ${error.message}`); // Log the error
      res.status(500).json({ message: error.message });
    }
  };

  //get single menu item

  const singleMenuItem =async (req,res)=>{
    const menuId=req.params.id;
    try{
      const menu=await Menu.findById(menuId);
      res.status(200).json(menu)
    }
    catch(error){
      res.status(500).json({message:error.message})
    }
  }

  //update a single item
  const updateMenuItem = async (req, res) => {
    const menuId = req.params.id;
    const { name, recipe, image, category, price } = req.body;
  
    try {
      const updatedMenu = await Menu.findByIdAndUpdate(
        menuId,
        { name, recipe, image, category, price },
        { new: true, runValidators: true }  // Fix 'runValidator' to 'runValidators'
      );
  
      if (!updatedMenu) {
        return res.status(404).json({ message: "Menu not found" });
      }
  
      return res.status(200).json(updatedMenu);  // Return the updated menu
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  

module.exports={
    getAllMenuItems,
    postMenuItem,deleteMenuItem,singleMenuItem,updateMenuItem

}