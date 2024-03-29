async function triggerDeploy() {
  try {
    const response = await fetch(process.env.DEPLOY_HOOK_URL!, {
      method: "POST",
    });
    console.log("Status code:", response.status);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error triggering deploy:", error);
  }
}
