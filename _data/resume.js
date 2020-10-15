var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_SECRET
});
var base = Airtable.base('app8XPj1PDczqby8i');
const table = base('resume')
const lettersTable = base('applications')

const getApplications = async () => {
    try{
        const letters = await lettersTable.select().firstPage()
        return letters
    }
    catch(err){console.error(err)}
}

const getJobs = async () => {
    try {
        const records = await
            table
                .select({
                    maxRecords: 20,
                    sort: [{field: "from", direction: "desc"}]
                })
                .firstPage()
                
        return records
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = async function () {
    let applications = await getApplications()    
    let jobs = await getJobs();
    console.log(applications,jobs)
    return {jobs: jobs, applications: applications};
};
