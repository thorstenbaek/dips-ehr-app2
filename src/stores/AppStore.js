import { writable, readable, derived } from "svelte/store";

export const configuration = writable(null);

const configurationUrl = "https://raw.githubusercontent.com/thorstenbaek/dips-ehr-configuration/master/configuration.json";

fetch(configurationUrl).then(
    response => {        
        response.json().then(
            data => {                        
                const environmentName = findEnvironmentName();
                let config = data.configurations.filter(c => c.environment == environmentName);
                if (config.length == 0)
                {
                    console.log(`Found no settings for environment: ${environmentName}. Using default`);    
                    config = data.configurations.filter(c => c.environment == "default");
                }
                
                configuration.set(config[0].settings);
            })
        });


function findEnvironmentName()
{
    var environmentName = window.location.environmentName;

    if (window.location.port !== "")
    {
      console.log(`Adding port '${window.location.port}' to environmentName`);
      environmentName = environmentName + ":" + window.location.port;
    }

    return environmentName;
}