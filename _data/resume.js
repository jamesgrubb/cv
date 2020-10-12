var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_SECRET
});
var base = Airtable.base('app8XPj1PDczqby8i');
const table = base('jobs')

const getJobs = async () => {
    try {
        const records = await
            table
                .select({
                    maxRecords: 3,
                })
                .firstPage()
        return records
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = async function () {

    let jobs = await getJobs();
    console.log(jobs)
    return jobs;
};
