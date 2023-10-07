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
        res.status(200).json(daresponseta);
    }
}

const update = async (req, res) => {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

    console.log(req.body);

    const response = await supabase
        .from('user')
        .update({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            viewedPapers: req.body.viewedPapers,
            starredPapers: req.body.starredPapers,
        })
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

