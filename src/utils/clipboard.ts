export async function copyToClipboard(text: string): Promise<boolean> {
  // Try modern clipboard API first
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.log('Clipboard API failed, trying fallback method');
    }
  }

  // Fallback method using textarea
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Make the textarea invisible
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    // Try to copy
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    return successful;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
}
