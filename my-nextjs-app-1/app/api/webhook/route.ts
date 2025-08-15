export default async function handler(req: Request, res: Response) {
    if (req.method === 'POST') {
        const webhookData = await req.json();
        console.log(webhookData);

        return res.status(200).json({ message: 'Webhook received successfully' });
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}