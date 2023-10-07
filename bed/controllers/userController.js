import { createClient } from '@supabase/supabase-js';

const create = async (req, res) => {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);


    const response = await supabase
        .from('user')
        .insert(req.body);

    if (response.error) {
        res.status(400).json({ error: response.error.message });
    } else {
        res.status(201).json(response);
    }
}

const read = async (req, res) => {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    const response = await supabase
        .from('user')
        .select('*');

    if (response.error) {
        res.status(400).json({ error: response.error.message });
    } else {
        res.status(200).json(response);
    }
}

const readById = async (req, res) => {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    const response = await supabase
        .from('user')
        .select('*')
        .eq('userId', req.params.id);

    if (response.error) {
        res.status(400).json({ error: response.error.message });
    } else {
        res.status(200).json(response);
    }
}

const readById1 = async (id) => {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

    const response = await supabase
        .from('user')
        .select('*')
        .eq('userId', id);

    if (response.error) {
        return response.error.message;
    } else {
        return response;
    }
}

const update = async (req, res) => {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

    console.log("here", req.body);

    let bodyToSend = req.body;

    if (req.body.credits) {
        // get current credits
        await readById1(req.body.userId).then((response) => {
            console.log(response);
            const currentCredits = response.data[0].credits;
            const newCredits = currentCredits + req.body.credits;
            console.log(newCredits);
            bodyToSend.credits = newCredits;
        }
        )
    }

    if (req.body.viewedPapers) {
        // get current viewedPapers
        await readById1(req.body.userId).then((response) => {
            const currentViewedPapers = response.data[0].viewedPapers;
            // append to the array
            currentViewedPapers.push(req.body.viewedPapers[0]);
            bodyToSend.viewedPapers = currentViewedPapers;
        }
        )
    }

    if (req.body.starredPapers) {
        // get current starredPapers
        await readById1(req.body.userId).then((response) => {
            console.log(response.data[0].starredPapers);
            const currentStarredPapers = response.data[0].starredPapers;
            // append to the array
            currentStarredPapers.push(req.body.starredPapers[0]);
            bodyToSend.starredPapers = currentStarredPapers;
        }
        )
    }

    console.log("\n\n\nbodyToSend", bodyToSend);

    const response = await supabase
        .from('user')
        .update(bodyToSend)
        .eq('userId', req.params.id);

    if (response.error) {
        res.status(400).json({ error: response.error.message });
    } else {
        res.status(200).json(response);
    }
}

const remove = async (req, res) => {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    const response = await supabase
        .from('user')
        .delete()
        .eq('userId', req.params.id);

    if (response.error) {
        res.status(400).json({ error: response.error.message });
    } else {
        res.status(200).json(response);
    }
}

export {
    create,
    read,
    readById,
    update,
    remove
}

