import { readable, writable, derived } from "svelte/store";
import DocumentList from "../components/DocumentList.svelte";
import PatientApp from "../apps/PatientApp.svelte";
import DocumentApp from "../apps/DocumentApp.svelte";

const configurationUrl = "https://raw.githubusercontent.com/thorstenbaek/dips-ehr-configuration/master/configuration.json";

export const settings = readable(
    null, set => {
        fetch(configurationUrl).then(
            response => {        
                response.json().then(
                    data => {                        
                        const environmentName = findEnvironmentName();
                        let config = data.configurations.filter(c => c.environment == environmentName);
                        if (config.length == 0)
                        {
                            console.log(`No settings was found for environment: ${environmentName}. Using default settings`);    
                            config = data.configurations.filter(c => c.environment == "default");
                        }
                        
                        set(config[0].settings);
                    })
                });
    });

function findEnvironmentName()
{
    var environmentName = window.location.hostname;

    if (window.location.port !== "")
    {
      console.log(`Adding port '${window.location.port}' to environmentName`);
      environmentName = environmentName + ":" + window.location.port;
    }

    return environmentName;
}

export const documentApps = derived(
    settings,
    ($settings, set) => {
        if ($settings != null)
        {
            var apps = [];
            var documentApps = $settings.SmartOnFhirApps.filter(a => !a.context || a.context == "document");
            for(var i = 0; i < documentApps.length; i ++)
            {
                const app = documentApps[i];
                apps.push(
                    {   
                        name: app.name,
                        mimetype: app.mimetype,
                        component: DocumentApp,
                        app: app
                    })
            }
            set(apps);
        }
    }
)

export const patientApps = derived(
    settings, 
    ($settings, set) => {
        if ($settings != null)
        {                                    
            var apps = [];
            const documentList = {
                name: "Documents",
                component: DocumentList,
            }
            
            apps.push(documentList);
            var patientApps = $settings.SmartOnFhirApps.filter(a => !a.context || a.context == "patient");
            for(var i = 0; i < patientApps.length; i ++)
            {
                const app = patientApps[i];
                apps.push(
                    {   
                        name: app.name,
                        component: PatientApp,
                        app: app
                    })
            }
            set(apps);
        }
    }
);


export const instances = writable([]);
export const active = writable(null);

export const patient = writable(null);