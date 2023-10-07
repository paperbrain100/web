import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  const { user } = req.body;

  if (method == 'PUT') {
    const body = req.body;
    console.log('here', body);

    if (!body) {
      return res.status(400).json({
        success: false,
        error: 'You must provide a body to update',
      });
    }

    let bodyToSend = {};

    fetch(`http://localhost:8000/user/${user.sid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyToSend),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        res.send({
          message: 'User updated successfully!',
          data: data,
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}
