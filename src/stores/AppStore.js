import { readable, writable, derived } from "svelte/store";
import DocumentList from "../components/DocumentList.svelte";
import PatientApp from "../apps/PatientApp.svelte";
import DocumentApp from "../apps/DocumentApp.svelte";

const configurationUrl = "https://raw.githubusercontent.com/thorstenbaek/sandbox-environments/master";

export const configUrl = readable(null, set => {
    if (window.CONFIG_URL === "${CONFIG_URL}") {
    	// CONFIG_URL not resolved - using default
	    set(configurationUrl);	
    } else {
        set(window.CONFIG_URL);
    }

});

function findDomain() {
    const name = window.location.hostname;
    
    const pattern = ".dips-ehr-app.";
    const index = name.lastIndexOf(pattern);
    var domainName = name;
    
    if (index >= 0) {
        domainName = name.substring(index + pattern.length);
    }

    console.log("domainName:" + domainName);        
    return domainName;
}

function findEnvironmentName() {
    var name = window.location.hostname;
    const index = name.indexOf(".dips-ehr-app");
    var environment = "";

    if (index >= 0) {
        environment = name.substring(0, index);
    }

    console.log("environmentName:" + environment);
    return environment;
}

const resolveVariables = async (response) => {
    var text = await response.text()
   
    if (text.includes("RELEASE-NAME") || text.includes("DOMAIN")) {
        // variables in configuration - resolve
        const environmentName = findEnvironmentName();
        text = text.replaceAll("RELEASE-NAME", environmentName);
        const domain = findDomain();
        text = text.replaceAll("DOMAIN", domain);

        return JSON.parse(text)
    } else {
        // no variables in text - using 
        return JSON.parse(text)
    }
}

export const settings = derived(
    configUrl,
    async ($configUrl, set) => {
        var response = await fetch(`${$configUrl}/configuration.json`);
        
        var data = await resolveVariables(response);       
        console.log(data); 
 
        if (data.configurations) {
            // config is old format with multiple configurations    
            const environmentName = findEnvironmentName();
            let config = data.configurations.filter(c => c.environment == environmentName);
            if (config.length == 0)
            {
                console.log(`No settings was found for environment: ${environmentName}. Using default settings`);    
                config = data.configurations.filter(c => c.environment == "default");
            }

            set(config[0].settings);            
        } else {
            set(data.settings);
        }
        
    });

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