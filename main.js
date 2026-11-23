
var ClearIngredientsButton = document.getElementById("ClearIngredientsButton");

var totalWeight=0;

var totalWaterContent =0;

var activeIngredients = [];



var ingredientSelect = document.getElementById("ingredientSelect");

var ScaleRecipeButton = document.getElementById("ScaleRecipeButton");

var ScaleRecipeWeight= document.getElementById("ScaleRecipeWeight");



var recipeContainerList = document.getElementById("recipeContainerList")

var AddIngredientButton = document.getElementById("AddIngredientButton");

var RemoveIngredientButton = document.getElementById("RemoveIngredientButton");

var totatWeightHolder = document.getElementById("totalWeightHolder");

var totalWaterContentHolder = document.getElementById("TotalWaterContentHolder");

var HydrationHolder = document.getElementById("HydrationHolder");

var Hydration = 0;

var LoadTemplateRecipeButton = document.getElementById("LoadTemplateRecipeButton");

var BaseIngredient = FindIngredientWithId("Flour"); 

var ScaledRecipeHolder = document.getElementById("ScaledRecipeHolder");

var ScaledRecipeWeightHolder = document.getElementById("ScaledTotalWeightHolder");
ScaledRecipeHolder.style.display = 'none';


/* var baseIngredientSelect = document.getElementById("baseIngredientSelect");
*/
/* baseIngredientSelect.addEventListener("change", (event) =>{
    BaseIngredient = FindIngredientWithId(baseIngredientSelect.options[baseIngredientSelect.selectedIndex].value);
    console.log("base ingredient is = " + BaseIngredient.value + ", Weight = " + BaseIngredient.getAttribute('weight'));
}) */

ScaleRecipeButton.onclick = (event) =>{
    event.preventDefault();
    ScaleRecipe();
}



CreateBaseIngredient();
function CreateBaseIngredient(){
    const baseIngredientHolder = document.createElement("li")
    const baseIngredientTextHolder = document.createElement("y");
    const inputField = document.createElement("input");
    const baseIngredientPercentageHolder = document.createElement("y");
    baseIngredientPercentageHolder.classList.add("baseIngredientPercentageHolder");
    baseIngredientPercentageHolder.id = ("baseIngredientPercentageHolder");
    baseIngredientPercentageHolder.innerText = "100%";
    inputField.type = "number"; 
    inputField.id = "Flour" + "inputField"
    inputField.classList.add("editableweightholder");
    inputField.classList.add("baseIngredientInputField");
        //inputField.placeholder ="Enter Weight";
    inputField.value = 0;
    inputField.min = "0";
    inputField.step="any";
    inputField.addEventListener("change", (event) => {
        if (!parseFloat(inputField.value) > 0){
            inputField.value = 0;
        }
        BaseIngredient.setAttribute('weight', parseFloat(inputField.value));
        CalculateTotalWeight();
        CalculateTotalWaterContent();
    })

    baseIngredientTextHolder.innerText = "g " + BaseIngredient.value + " ";
    activeIngredients.push(BaseIngredient);

    baseIngredientHolder.appendChild(inputField);
    recipeContainerList.appendChild(baseIngredientHolder);
    baseIngredientHolder.appendChild(baseIngredientTextHolder);
    baseIngredientHolder.appendChild(baseIngredientPercentageHolder);
}


AddIngredientButton.onclick = (event) =>{
    event.preventDefault();
    var selectedIngredient = ingredientSelect.options[ingredientSelect.selectedIndex]
    if (activeIngredients.includes(selectedIngredient)){
        alert(selectedIngredient.value + " is already in the recipe!");
        return;
    }
    CreateIngredient(selectedIngredient.value);
    //ingredientSelect.options[ingredientSelect.selectedIndex].setAttribute('water_content', "23%");
    //alert(ingredientSelect.options[ingredientSelect.selectedIndex].getAttribute('water_content') + "  " + selectedIngredient.value);
}

var weightInputFieldArray = document.getElementsByClassName("editableweightholder");




ClearIngredientsButton.onclick = (event)=>{
    event.preventDefault();
    ClearIngredients();
} 
function RemoveIngredient(ingredient){
    if (activeIngredients.includes(ingredient)){
        ingredient.recipeItem.remove()
        ingredient.setAttribute('weight', 0);
        const index = activeIngredients.indexOf(ingredient);
        if (index > -1){
            activeIngredients.splice(index, 1); 
        }
        console.log("removed ingredient: " + ingredient.value);
    }
}

function CalculateTotalWeight(){
    //UpdateIngredientWeights();
    var weightArray = [];
    totalWeight = 0;
    weightArray = [];
    if (activeIngredients == []){ 
        totatWeightHolder.innerText = "Total Weight = " + totalWeight + "g";
   
        totalWeight =0;
        return;
    }
    
    for (let i = 0; i<activeIngredients.length; i++){
        if (!activeIngredients[i].getAttribute('weight') > 0){
            activeIngredients[i].getAttribute('weight') = 0;
        }
        weightArray.push(parseFloat(activeIngredients[i].getAttribute('weight')));
    }

    for (let i=0;i<weightArray.length;i++){
        totalWeight += weightArray[i]; 
    }
    totatWeightHolder.innerText = "Total Weight = " + Math.round(totalWeight * 10)/10 + "g";
    weightArray = [];
}
function CalculateTotalWaterContent(){
    //UpdateIngredientWeights();
    var weightArray = [];
    totalWaterContent = 0;
    weightArray = [];
    if (activeIngredients == []){ 
        totalWaterContentHolder.innerText = "Total Water Content = " + totalWaterContent + "g";
        totalWaterContent=0;
        return;
    }
    
    for (let i = 0; i<activeIngredients.length; i++){
        var Water_Content = (parseFloat(activeIngredients[i].getAttribute('weight')) * parseFloat(activeIngredients[i].getAttribute('waterContent')))/100;
        weightArray.push(Water_Content);
    }
    for (let i=0;i<weightArray.length;i++){
        totalWaterContent += weightArray[i]; 
    }
    totalWaterContentHolder.innerText = "Total Water Content = " + Math.round(totalWaterContent *10)/10 + "g";
    Hydration = (totalWaterContent/BaseIngredient.getAttribute('weight'))*100;
    if (!Hydration > 0){
        Hydration = 0;
    }
    if (Hydration != 0){
        HydrationHolder.innerText = "Hydration ≈ " + Math.round(Hydration) + "%";
    }
    else{
        HydrationHolder.innerText = "Hydration = " + Math.round(Hydration) + "%";
    }
    weightArray = [];
}

function CalculateIngredientPercentage(ingredient){
    if (ingredient == BaseIngredient) return 100
    if (BaseIngredient.getAttribute('weight') != 0){
        ingredient.setAttribute('percentageInRecipe', (parseFloat(ingredient.getAttribute('weight'))/ parseFloat(BaseIngredient.getAttribute('weight'))) * 100); 
        return Math.round(ingredient.getAttribute('percentageInRecipe') * 10)/10;
    }
    else return 0;
}
function UpdateInputField(ingredient){

    FindInputField(ingredient).value = parseFloat(ingredient.getAttribute('weight')); 
}
function FindInputField(ingredient){
    const inputField = document.getElementById(ingredient.value + "inputField");
    return inputField;
}
function UpdatePercentageHolder(ingredient){
    if (GetIngredientPercentageHolder(ingredient) != null){
        GetIngredientPercentageHolder(ingredient).innerText = CalculateIngredientPercentage(ingredient) + "%";
    }
    else{ 
        console.log(ingredient.value + "uhhhhhhhhhh");
        return;
    }
}

function FindIngredientWithId(id){
    for(i=0; i < ingredientSelect.options.length; i++){
        if (ingredientSelect.options[i].value == id) {
            return ingredientSelect.options[i];
        }
    }
}

function ScaleRecipe(){
    if (!ScaleRecipeWeight.value > 0){
        alert("Please enter an appropiate weight value to scale the recipe into");
    }
    else if (ScaleRecipeWeight.value == 0){
        alert("Please enter an appropiate weight value to scale the recipe into");  
    }
    else{
        if (BaseIngredient.getAttribute('weight') == 0){
            alert("Flour weight should be assigned before scaling!");
            return;
        }
        ResetScaledRecipe();

        var scaledWeight = parseFloat(ScaleRecipeWeight.value);
        ScaledRecipeWeightHolder.innerText = "Total Weight = " + scaledWeight +"g";
        ScaledRecipeHolder.style.display = 'block';
        var P;
        var N;
        N=0;
        P =0;
        for (let i=0; i<activeIngredients.length;i++){
            P += parseFloat(activeIngredients[i].getAttribute('percentageInRecipe'));
        }
        N = scaledWeight/P;
        for (let i=0; i<activeIngredients.length;i++){
            var scaledIngredientHolder = document.createElement('div');
            scaledIngredientHolder.classList.add("ScaledIngredientsHolder");
            scaledIngredientHolder.innerText = Math.round(N * parseFloat(activeIngredients[i].getAttribute('percentageInRecipe')) *10)/10 + "g " + activeIngredients[i].value;
            ScaledRecipeHolder.appendChild(scaledIngredientHolder);
        }
        var saveButton = document.createElement("button")
        saveButton.innerText = "Save";
        saveButton.classList.add("SaveRecipeButton");
        saveButton.classList.add("ScaledIngredientsHolder");
        ScaledRecipeHolder.appendChild(saveButton);

    }

}
var scaleEggRecipeNumber = document.getElementById("ScaleEggRecipeNumber");
function ScaleEggRecipe(){
    if (!scaleEggRecipeNumber.value > 0){
        alert("Please specify the number of eggs you want to use!");
    }
    else if (scaleEggRecipeNumber.value == 0){
        alert("Please specify the number of eggs you want to use!");  
    }
    else if (!activeIngredients.includes(FindIngredientWithId("Egg"))){
        alert("Please add eggs to the recipe before scaling!");
    }
    else{
        if (BaseIngredient.getAttribute('weight') == 0){
            alert("Flour weight should be assigned before scaling!");
            return;
        }
        else if (FindIngredientWithId("Egg").getAttribute('weight') == 0)
        {
            alert("Egg weight should be assigned before scaling!");
            return;
        }
        ResetScaledRecipe();
        var N;

        N = (scaleEggRecipeNumber.value *50)/parseFloat(FindIngredientWithId("Egg").getAttribute('percentageInRecipe'));
        console.log(N);


        var P;
        P =0;
        for (let i=0; i<activeIngredients.length;i++){
            P += parseFloat(activeIngredients[i].getAttribute('percentageInRecipe'));
        }
        var scaledWeight = N * P;
        ScaledRecipeWeightHolder.innerText = "Total Weight = " + scaledWeight +"g";
        ScaledRecipeHolder.style.display = 'block';
        for (let i=0; i<activeIngredients.length;i++){
            var scaledIngredientHolder = document.createElement('div');
            scaledIngredientHolder.classList.add("ScaledIngredientsHolder");
            scaledIngredientHolder.innerText = Math.round(N * parseFloat(activeIngredients[i].getAttribute('percentageInRecipe')) *10)/10 + "g " + activeIngredients[i].value;
            ScaledRecipeHolder.appendChild(scaledIngredientHolder);
        }
        var saveButton = document.createElement("button")
        saveButton.innerText = "Save";
        saveButton.classList.add("SaveRecipeButton");
        saveButton.classList.add("ScaledIngredientsHolder");
        ScaledRecipeHolder.appendChild(saveButton);

    }

}
var scaleEggButton = document.getElementById("ScaleForOptimalEggButton");
scaleEggButton.onclick = (event) =>{
    ScaleEggRecipe();
}

function ResetWeights(){
    for (i=0; i<activeIngredients.length; i++){
        activeIngredients[i].setAttribute('weight', 0);
    }
    const inputArray = Array.from(document.getElementsByClassName("editableweightholder"));
    for (let i=0; i<inputArray.length;i++){
        inputArray[i].value = 0;
    }
}
function ResetScaledRecipe(){
        var elementsInNeedOfBeingDiscarded = document.getElementsByClassName("ScaledIngredientsHolder");
        var a = Array.from(elementsInNeedOfBeingDiscarded);
        for (let i=0;i<a.length;i++){
            a[i].remove();
        }
        ScaledRecipeHolder.style.display = 'none';
        
}
function ResetRecipe(){
    ResetWeights();
    ResetScaledRecipe();
    for (let i=0; i<activeIngredients.length;i++){
        if (activeIngredients[i].value == "Flour") continue;
        else{
            activeIngredients[i].recipeItem.remove();
        }
    }
        activeIngredients = [BaseIngredient];
    
}
function ClearIngredients(){
    ResetRecipe();

    CalculateTotalWeight();
    CalculateTotalWaterContent()
    
}

const templatePopupWrapper = document.getElementById("TemplatePopupWrapper");
const templatePopupCloseButton = document.getElementById("TemplateClosePopupButton");
templatePopupCloseButton.onclick = (event) =>{
    templatePopupWrapper.style.display = 'none';
}
const poundCakeButton = document.getElementById("PoundCakeButton");
poundCakeButton.onclick = (event) =>{
    LoadTemplateRecipe(PoundCakeRecipe);
    templatePopupWrapper.style.display = 'none';
}
const butterCakeButton = document.getElementById("ButterCakeButton");
butterCakeButton.onclick = (event)=>{
    LoadTemplateRecipe(ButterCakeRecipe);
    templatePopupWrapper.style.display = 'none';
}


LoadTemplateRecipeButton.onclick = (event) =>{
    templatePopupWrapper.style.display = 'block';
}



class Ingredient{
    constructor(Name, Weight){
        this.Name = Name;
        this.Weight = Weight;
    }
}
class Recipe{
    constructor(Ingredients, flourWeight){
        this.Ingredients = Ingredients;
        this.flourWeight = flourWeight;
    }
}



const poundCakeIngredients = [
    new Ingredient("Butter", 50),
    new Ingredient("Sugar", 50),
    new Ingredient("Egg", 50),
    new Ingredient("Salt", 0.5),
    new Ingredient("Baking Powder", 1.5),
    new Ingredient("Vanilla Extract", 2),
    new Ingredient("Milk", 17),
]
const PoundCakeRecipe = new Recipe(poundCakeIngredients, 50);

const butterCakeIngredients = [
    new Ingredient("Butter", 50),
    new Ingredient("Sugar", 100),
    new Ingredient("Egg", 33),
    new Ingredient("Salt", 1),
    new Ingredient("Baking Powder", 3),
    new Ingredient("Vanilla Extract", 4.6),
    new Ingredient("Milk", 100),
]
const ButterCakeRecipe = new Recipe(butterCakeIngredients, 100);




function LoadTemplateRecipe(recipe){
    ResetRecipe();
    SetBaseIngredientWeight(recipe.flourWeight);
    for(let i=0; i<recipe.Ingredients.length;i++){
        const ingredient = recipe.Ingredients[i];
        CreateIngredient(ingredient.Name, ingredient.Weight);
    }
    
    CalculateAllIngredientPercentages();
    CalculateTotalWeight();
    CalculateTotalWaterContent();
}

function SetBaseIngredientWeight(weight){
    BaseIngredient.setAttribute('weight', weight)
    FindInputField(BaseIngredient).value = weight;
}

function CreateIngredient(IngredientName, ingredientWeight=0){
    const ingredientToCreate = FindIngredientWithId(IngredientName);
    if (activeIngredients.includes(ingredientToCreate)){
        return;
    }

    const ingredient = document.createElement("li");
    ingredient.classList.add("ds");
    const ingredientTextHolder = document.createElement("y");
    const ingredientRemoveButton = document.createElement("button");
    ingredientRemoveButton.id = ingredientToCreate.value + "IngredientRemoveButton";
    const inputField = document.createElement("input");
    const ingredientPercentageHolder = document.createElement("y");
    ingredientPercentageHolder.classList.add("ingredientPercentageHolder");
    ingredientPercentageHolder.id = ingredientToCreate.value + "ingredientPercentageHolder";

    ingredientToCreate.recipeItem = ingredient;
    
    inputField.type = "number"; 
    inputField.id = ingredientToCreate.value + "inputField";
    inputField.classList.add("editableweightholder");
    //inputField.placeholder ="Enter Weight";
    inputField.value = ingredientWeight;
    ingredientToCreate.setAttribute('weight', ingredientWeight);
    inputField.min = "0";
    inputField.step="any";

    ingredientRemoveButton.innerText = "-";
    ingredientRemoveButton.classList.add("removeButton");

    ingredientTextHolder.innerText = "g " + ingredientToCreate.value + " ";
    
    ingredientToCreate.setAttribute('percentageInRecipe', (parseFloat(ingredientToCreate.getAttribute('weight'))/parseFloat(BaseIngredient.getAttribute('weight')))*100);
    activeIngredients.push(ingredientToCreate);

    ingredient.appendChild(ingredientRemoveButton);
    ingredient.appendChild(inputField);
    recipeContainerList.appendChild(ingredient);
    ingredient.appendChild(ingredientTextHolder);
    ingredient.appendChild(ingredientPercentageHolder);
    
    

    //console.log(activeIngredients);
    inputField.addEventListener("change", (event) => {
        if (!parseFloat(inputField.value) > 0){
            inputField.value = 0;
        }
        ingredientToCreate.setAttribute('weight', parseFloat(inputField.value));
        CalculateTotalWeight();
        CalculateTotalWaterContent();
        UpdatePercentageHolder(ingredientToCreate);
    })
    baseIngredientInputField = document.getElementsByClassName("baseIngredientInputField")[0];
    baseIngredientInputField.addEventListener("change", (event)=>{
        UpdatePercentageHolder(ingredientToCreate);
    })


     ingredientRemoveButton.onclick = (event)=>{
        event.preventDefault();
        RemoveIngredient(ingredientToCreate);
        CalculateTotalWeight();
        CalculateTotalWaterContent();
    }
    ingredientPercentageHolder.innerText = CalculateIngredientPercentage(ingredientToCreate) + "%";
}

function CalculateAllIngredientPercentages(){
    for (let i=0; i<activeIngredients.length;i++){
        UpdatePercentageHolder(activeIngredients[i]);
    }
}
/* function UpdateIngredientWeights(){
    for (let i=0; i<activeIngredients.length;i++){
        UpdateInputField(activeIngredients[i]);
    }
} */

function GetIngredientInputField(ingredient){
    if (ingredient == BaseIngredient) return document.getElementById("baseIngredientInputField");
    else{
        const inputField = document.getElementById(ingredient.value + "editableweightholder");
        return inputField;
    } 
}
function GetIngredientPercentageHolder(ingredient){
    if (ingredient == BaseIngredient) return document.getElementById("baseIngredientPercentageHolder");
    else{
        const percentageHolder = document.getElementById(ingredient.value + "ingredientPercentageHolder");
        return percentageHolder;
    } 
}

var activeConvertableIngredients = [];
var convertFromCupsButton = document.getElementById("ConvertFromCupsButton");
var closeConvertPopupButton = document.getElementById("CloseConvertPopUpButton");
closeConvertPopupButton.onclick = (event)=>{
    convertPopup.style.display = 'none';
}
var convertPopup = document.getElementById("ConvertPopupWrapper");
convertFromCupsButton.onclick = (event) =>{
    convertPopup.style. display = 'block';
}
var addConvertableIngredientButton = document.getElementById("AddConvertableIngredientButton");
var convertIngredientSelect = document.getElementById("convertIngredientSelect");
const recipeToConvertForm = document.getElementById("recipeToConvertForm");
AddConvertableIngredient(BaseIngredient);
addConvertableIngredientButton.onclick = (event)=>{
    event.preventDefault();
    var selectedConvertableIngredient =  convertIngredientSelect.options[convertIngredientSelect.selectedIndex];
    AddConvertableIngredient(selectedConvertableIngredient);
}

function AddConvertableIngredient(convertableIngredient){
    if (activeConvertableIngredients.includes(convertableIngredient)){
        alert(convertableIngredient.value + " is already in the recipe!");
        return;
    }
    if (activeConvertableIngredients.includes(BaseIngredient) && convertableIngredient.value == BaseIngredient.value) return;
    
    const convertIngredientHolder = document.createElement("li")
    convertIngredientHolder.classList.add("ConvertIngredientHolder");

    const convertIngredientRemoveButton = document.createElement("button");
    convertIngredientRemoveButton.classList.add("ConvertIngredientRemoveButton");
    convertIngredientRemoveButton.innerText = "-";
    convertIngredientRemoveButton.onclick = (event)=>{
        const index = activeConvertableIngredients.indexOf(convertableIngredient);
        if (index > -1){
            activeConvertableIngredients.splice(index, 1); 
        }
        convertIngredientHolder.remove();
    }

    const volumeInputField = document.createElement("input");
    volumeInputField.type = "number";
    volumeInputField.min = 0;
    volumeInputField.classList.add("convertIngredientWeightField");
    volumeInputField.id = convertableIngredient.value + "volumeField";

/*     volumeInputField.addEventListener("change", ()=>{
        ConvertToGrams(convertableIngredient);
    }) */

    const selectVolumeVesselHolder = document.createElement("select");
    selectVolumeVesselHolder.classList.add("SelectVolumeVessel");
    selectVolumeVesselHolder.id = convertableIngredient.value + "vesselHolder";



    if (CheckVesselType(convertableIngredient) =="tsp") {
        const tspOption = document.createElement("option");
        tspOption.innerText = "tsp";
        selectVolumeVesselHolder.options[0] = tspOption;
    }
    else if (CheckVesselType(convertableIngredient).includes("tsp") && CheckVesselType(convertableIngredient).includes("tbsp")){
        const tspOption = document.createElement("option");
        tspOption.innerText = "tsp";
        const tbpsOption = document.createElement("option");
        tbpsOption.innerText ="tbsp";
        selectVolumeVesselHolder.options[0] = tspOption;
        selectVolumeVesselHolder.options[1] = tbpsOption;
    }
    else if (CheckVesselType(convertableIngredient) == "cup"){
        const cupOption = document.createElement("option");
        cupOption.innerText = "cup";
        selectVolumeVesselHolder.options[0] = cupOption;
    }
    else if (CheckVesselType(convertableIngredient).includes("cup") && CheckVesselType(convertableIngredient).includes("tbsp")){
        const cupOption = document.createElement("option");
        cupOption.innerText = "cup";
        const tbpsOption = document.createElement("option");
        tbpsOption.innerText ="tbsp";   
        selectVolumeVesselHolder.options[0] = tbpsOption; 
        selectVolumeVesselHolder.options[1] = cupOption;

    }
    else if (CheckVesselType(convertableIngredient) =="egg"){

    }
    else if (CheckVesselType(convertableIngredient) =="egg white"){

    }
    else if (CheckVesselType(convertableIngredient) =="egg yolk"){

    }
    function isEgg(){
        if (CheckVesselType(convertableIngredient) =="egg" || CheckVesselType(convertableIngredient) =="egg white" || CheckVesselType(convertableIngredient) =="egg yolk"){
            return true;
        }
        return false;
        
    }
    const nameHolder = document.createElement("y");
    if (isEgg() == false){
        nameHolder.innerText = convertableIngredient.value;
    }
    else{
        nameHolder.innerText = "Number of " + convertableIngredient.value + "s";
    }

    recipeToConvertForm.appendChild(convertIngredientHolder);
    if (convertableIngredient != BaseIngredient){
        convertIngredientHolder.appendChild(convertIngredientRemoveButton);
    }
    else{
        convertIngredientRemoveButton.remove();
    }
    convertIngredientHolder.appendChild(volumeInputField);
   if (isEgg() == false){
        convertIngredientHolder.appendChild(selectVolumeVesselHolder);
    }
    else selectVolumeVesselHolder.remove();
    convertIngredientHolder.appendChild(nameHolder);

    activeConvertableIngredients.push(convertableIngredient);

}
function CheckVesselType(convertableIngredient){
    var ingredientSource = FindIngredientWithId(convertableIngredient.value);
    var availableVessels = [];

    if (ingredientSource.getAttribute("tsp") != "no"){
        availableVessels.push("tsp");
    }
    if (ingredientSource.getAttribute("tbsp") != "no"){
        availableVessels.push("tbsp");
    }
    if (ingredientSource.getAttribute("cup") != "no"){
        availableVessels.push("cup");
    }
    if (ingredientSource.value == "Egg"){
        availableVessels.push("egg")
    }
    if (ingredientSource.value == "Egg White"){
        availableVessels.push("egg white")
    }
    if (ingredientSource.value == "Egg Yolk"){
        availableVessels.push("egg yolk")
    }
    //if (ingredientSource.getAttribute("egg"))
    return availableVessels;
}


var convertButton = document.getElementById("ConvertButton");
convertButton.onclick = (event) =>{
    event.preventDefault();
    ClearIngredients();
    for (let i=0; i<activeConvertableIngredients.length;i++){
        var convertedWeight = ConvertToGrams(activeConvertableIngredients[i]);
        CreateIngredient(activeConvertableIngredients[i].value, convertedWeight);
    } 
    CalculateAllIngredientPercentages();
    CalculateTotalWaterContent();
    CalculateTotalWeight();
    UpdateInputField(BaseIngredient);
}
function ConvertToGrams(convertableIngredient){
    const volumeVessel = FindVesselHolder(convertableIngredient);
    const ingredientSource = FindIngredientWithId(convertableIngredient.value);
    var convertedWeight = 0;
    const volumeField = FindVolumeField(convertableIngredient);
    if (CheckVesselType(convertableIngredient) =="tsp") {
        convertedWeight = parseFloat(ingredientSource.getAttribute("tsp")) * parseFloat(volumeField.value);

    }
    else if (CheckVesselType(convertableIngredient).includes("tsp") && CheckVesselType(convertableIngredient).includes("tbsp")){
        if (volumeVessel.options[volumeVessel.selectedIndex].innerText == "tsp"){
            console.log("selected is tsp!");

            convertedWeight = parseFloat(ingredientSource.getAttribute("tsp")) * parseFloat(volumeField.value);
            
        }
        else if (volumeVessel.options[volumeVessel.selectedIndex].innerText == "tbsp"){
            convertedWeight = parseFloat(ingredientSource.getAttribute("tbsp")) * parseFloat(volumeField.value);
        }
    }
    else if (CheckVesselType(convertableIngredient) == "cup"){
        convertedWeight = parseFloat(ingredientSource.getAttribute("cup")) * parseFloat(volumeField.value);
    }
    else if (CheckVesselType(convertableIngredient).includes("cup") && CheckVesselType(convertableIngredient).includes("tbsp")){
        if (volumeVessel.options[volumeVessel.selectedIndex].innerText == "cup"){
            convertedWeight = parseFloat(ingredientSource.getAttribute("cup")) * parseFloat(volumeField.value);
            
        }
        else if (volumeVessel.options[volumeVessel.selectedIndex].innerText == "tbsp"){
            convertedWeight = parseFloat(ingredientSource.getAttribute("tbsp")) * parseFloat(volumeField.value);
        }
    }
    else if (CheckVesselType(convertableIngredient) =="egg"){
        convertedWeight = parseFloat(ingredientSource.getAttribute("egg")) * parseFloat(volumeField.value);
    }
    else if (CheckVesselType(convertableIngredient) =="egg white"){
        convertedWeight = parseFloat(ingredientSource.getAttribute("eggWhite")) * parseFloat(volumeField.value);
    }
    else if (CheckVesselType(convertableIngredient) =="egg yolk"){
        convertedWeight = parseFloat(ingredientSource.getAttribute("eggYolk")) * parseFloat(volumeField.value);
    }
    convertableIngredient.setAttribute('weight', convertedWeight);

    return convertedWeight;
}
function FindVolumeField(convertableIngredient){
    const volumeField = document.getElementById(convertableIngredient.value + "volumeField");
    return volumeField;
}
function FindVesselHolder(convertableIngredient){
    const vesselHolder = document.getElementById(convertableIngredient.value + "vesselHolder");
    return vesselHolder;
}


function FindClosestWeight(weight, listOfWeights){
    for(let i=1; i<listOfWeights.length; i++){
        if (listOfWeights[i] > weight){
            difference1 = Math.abs(listOfWeights[i] - weight);
            difference2 = Math.abs(listOfWeights[i-1] - weight);
            if (difference1 < difference2){
                weight = listOfWeights[i];
                return weight;
            } 
            else{
                weight = listOfWeights[i-1];
                return weight;
            }
        }
        else if (listOfWeights[i] == weight){
            return weight;
        }
    }
}


