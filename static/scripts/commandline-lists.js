// Stores the objects used to create cmmand line settings

let currentCommandLineList = [] 

let themeCommands = {
  title: "Theme...",    
  configKey: "theme",
  list: [],
};
getThemesList().then((themes) => {
  themes.forEach((theme) => {
    themeCommands.list.push({
      id: "changeTheme" + capitalizeFirstLetter(theme.name),
      display: theme.name.replace(/_/g, " "),
      configValue: theme.name,
      /*hover: () => {
        // previewTheme(theme.name);
        ThemeController.preview(theme.name);
      },
      exec: () => {
        UpdateConfig.setTheme(theme.name);
      },*/
    });
  });
});


// default command is only a wrapper for all main settings, which have subcommand groups
let defaultCommands = {
    title: "",
    list: [
            {
                id: "changeTheme",
                display: "Theme...",
                icon: "fa-palette",
                subgroup: themeCommands,
            },
        ]
    }

currentCommandLineList = [defaultCommands]