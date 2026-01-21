let presets = [];
let presetMenu;
const URI_endpoint = "http://localhost:3000/api/presets";

async function getData() {
  try {
  // fetch is asynchronous, it returns a Promise
  const response = await fetch(URI_endpoint);
  // this line will be executed only when 
  // the previous one finished
  // .json() is also asynchronous and decodes the JSON response to a JS object
  presets = await response.json();

  // now we can build the preset menu
  //buildPresetMenu();
  buildPresetMenuWithGroups();

  // More advanced version with "optgroup" HTML elements for categories
  // This is optional, but dropdown menu looks better with groups
  //buildPresetMenuWithGroups();
  } catch (error) {
    document.body.innerHTML += "<p>Error fetching presets from server: " + error + "</p>";
  }
}

function buildPresetMenu() {
  presetMenu.innerHTML = ""; // clear existing content

  // Build first entry with a disabled option to prompt user to select a preset
  let firstOption = document.createElement("option");
  firstOption.value = ""; // no value
  firstOption.text = "Select a preset";
  firstOption.disabled = true;
  firstOption.selected = true; // selected by default, the menu will display this entry at first
  presetMenu.appendChild(firstOption);

  // build the preset menu options
  presets.forEach((preset, index) => {
    let option = document.createElement("option");
    option.value = index; // we use the index as value
    option.text = preset.name; // display the preset name

    // let's add it to the parent ul element
    presetMenu.appendChild(option);
  });
}

function buildPresetMenuWithGroups() {
  // Build an option group for each category
  const categories = {};
  
  // First, group presets by category
  presets.forEach((preset, index) => {
    const category = preset.type || "Uncategorized";
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push({ preset, index });
  });

  // Create first disabled option
  let firstOption = document.createElement("option");
  firstOption.value = ""; // no value
  firstOption.text = "Select a preset";
  firstOption.disabled = true;
  firstOption.selected = true; // selected by default
  presetMenu.appendChild(firstOption);

  // Now, create a group for each category
  // explain [category, items] of Object.entries(categories)
  // category is the key (category name)
  // items is the array of presets in this category
  // this notation is called destructuring assignment
  // Object.entries(categories) returns an array of [key, value] pairs
  // here is a super simple example of destructuring assignment
  /*
  const obj = { a: 1, b: 2 };
  for (const [key, value] of Object.entries(obj)) {
    console.log(key, value);
  }
  */
  for (const [category, items] of Object.entries(categories)) {
    const optgroup = document.createElement("optgroup");
    optgroup.label = category;

    items.forEach(({ preset, index }) => {
      const option = document.createElement("option");
      option.value = index;
      option.text = preset.name;
      optgroup.appendChild(option);
    });

    presetMenu.appendChild(optgroup);
  }
}


async function start() {
  // called only when page is loaded
  // and DOM is ready

  presetMenu = document.querySelector("#presetMenu");
 
  // get the presets from the server
  await getData();

  return presetMenu;
}

export { start, presets };