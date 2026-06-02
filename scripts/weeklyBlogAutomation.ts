// Called by a cron job every Monday to kick off the weekly blog pipeline.
// Step 1: generates 14 titles and sends them to GHL for validation.
// Step 2: GHL webhook calls /api/publish-article for each validated title.

export async function runWeeklyAutomation() {
  console.log("Starting weekly blog automation...");
  await import("./generateBlogTitles");
}

runWeeklyAutomation();
