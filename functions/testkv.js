export async function onRequest(context) {
  const name = await context.env.ALLOW_TEST.get('name');
  return new Response(name);
}
