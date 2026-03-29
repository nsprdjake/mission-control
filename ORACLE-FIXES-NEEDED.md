# 🔧 Desert Oracle - Required Fixes

**Priority:** CRITICAL - Must fix before showing Jake  
**Estimated Time:** 2-3 hours  
**Assignee:** Syntax

---

## 🚨 Bug #1: Share Button Doesn't Update URL

**Current Behavior:**
- Clicking "Share This Wisdom" does nothing to the URL
- URL stays `https://hub.nsprd.com/experiments/oracle`

**Expected Behavior:**
- URL should update to `https://hub.nsprd.com/experiments/oracle?f=c7` (or whatever fortune ID)
- User can copy URL from address bar
- Direct link should load that specific fortune (this part DOES work)

**Fix:**
```typescript
// In the share button handler, add:
const fortuneId = getCurrentFortuneId(); // Get current fortune ID
const shareUrl = `${window.location.origin}${window.location.pathname}?f=${fortuneId}`;

// Update browser URL without reload
window.history.pushState({}, '', shareUrl);

// Then try clipboard (see Bug #2 for improved handling)
```

**Test:**
1. Click oracle, get fortune
2. Click "Share This Wisdom"
3. URL should change to include `?f=` parameter
4. Copy URL, paste in new tab → should show same fortune

---

## 🚨 Bug #2: Share Button Clipboard Fails Silently

**Current Behavior:**
- Share button tries to write to clipboard
- Fails with: `NotAllowedError: Failed to execute 'writeText' on 'Clipboard': Write permission denied`
- User sees no feedback - doesn't know if it worked or failed

**Expected Behavior:**
- Attempt clipboard copy
- If success: Show "Link copied!" toast
- If fail: Show fallback or error message
- User always knows what happened

**Fix:**
```typescript
const handleShare = async () => {
  const fortuneId = getCurrentFortuneId();
  const shareUrl = `${window.location.origin}${window.location.pathname}?f=${fortuneId}`;
  
  // Update URL first (always works)
  window.history.pushState({}, '', shareUrl);
  
  // Try clipboard (may fail)
  try {
    await navigator.clipboard.writeText(shareUrl);
    showToast('Link copied to clipboard!', 'success');
  } catch (err) {
    console.warn('Clipboard write failed:', err);
    
    // Fallback option 1: Try navigator.share() on mobile
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Desert Oracle',
          text: fortuneText,
          url: shareUrl
        });
        showToast('Shared successfully!', 'success');
        return;
      } catch (shareErr) {
        // User cancelled share dialog
      }
    }
    
    // Fallback option 2: Show URL for manual copy
    showToast('Link updated! Copy from address bar.', 'info');
  }
};
```

**Create a simple toast component:**
```typescript
const showToast = (message: string, type: 'success' | 'error' | 'info') => {
  // Simple implementation:
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.className = `oracle-toast ${type}`;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
};
```

**CSS for toast:**
```css
.oracle-toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem 2rem;
  background: rgba(0, 0, 0, 0.8);
  color: #f5f5dc;
  border-radius: 0.5rem;
  z-index: 1000;
  animation: slideUp 0.3s ease;
}

.oracle-toast.success {
  border: 2px solid #4ade80;
}

.oracle-toast.error {
  border: 2px solid #ef4444;
}

.oracle-toast.info {
  border: 2px solid #60a5fa;
}

@keyframes slideUp {
  from { opacity: 0; transform: translate(-50%, 20px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
```

---

## 🚨 Bug #3: "Consult Again" Doesn't Reset Properly

**Current Behavior:**
- Sometimes leaves fortune visible
- Doesn't reliably return to landing screen
- State might be partially reset

**Expected Behavior:**
- Click "Consult Again" → back to landing screen with cactus
- Can consult multiple times without issues
- Clean state reset

**Fix:**
```typescript
const handleConsultAgain = () => {
  // Clear URL parameter
  window.history.pushState({}, '', window.location.pathname);
  
  // Reset component state
  setFortune(null);
  setShowFortune(false);
  setShowButtons(false);
  
  // Trigger any exit animations
  // Then reset to landing view
};
```

**Test:**
1. Get a fortune
2. Click "Consult Again"
3. Should see landing screen with cactus
4. Click cactus again → get new fortune
5. Repeat 5 times to verify consistency

---

## ⚠️ Bug #4: Oracle Button Stability (Lower Priority)

**Current Behavior:**
- Uses `<div role="button">`
- Playwright reports element as "not stable" for clicking
- May affect some users or automated tests

**Expected Behavior:**
- Button is reliably clickable
- No stability warnings

**Fix:**
```typescript
// Change from:
<div role="button" tabIndex={0} onClick={handleClick}>
  <img src="/oracle-cactus.png" alt="Desert Oracle" />
</div>

// To:
<button onClick={handleClick} aria-label="Consult the Desert Oracle">
  <img src="/oracle-cactus.png" alt="Desert Oracle" />
</button>
```

**CSS adjustment:**
```css
button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  will-change: transform; /* Helps with animation stability */
}
```

---

## ✅ Testing Checklist After Fixes

After implementing fixes, test:

1. **Share functionality:**
   - [ ] URL updates with `?f=` parameter
   - [ ] Toast notification shows on share click
   - [ ] Clipboard copy works (when permissions allow)
   - [ ] Direct link works when pasted in new tab

2. **Consult Again:**
   - [ ] Returns to landing screen
   - [ ] Can consult 5 times in a row without issues
   - [ ] URL parameter cleared

3. **Button stability:**
   - [ ] Oracle button clicks reliably
   - [ ] No console warnings
   - [ ] Works on mobile

4. **Regression testing:**
   - [ ] Fortunes still display correctly
   - [ ] Typewriter animation still smooth
   - [ ] Mobile layout still works
   - [ ] Keyboard navigation still works

---

## 📦 Files to Modify

Likely files (adjust based on actual project structure):
- `app/experiments/oracle/page.tsx` (or similar)
- `app/experiments/oracle/OracleClient.tsx` (if client component separate)
- `app/experiments/oracle/oracle.css` (for toast styles)

---

## 🎯 Success Criteria

Before marking as complete:

1. ✅ Share button updates URL with fortune parameter
2. ✅ User sees feedback when sharing (toast notification)
3. ✅ Consult Again reliably returns to landing
4. ✅ No console errors
5. ✅ Manual testing on Chrome + Safari (desktop)
6. ✅ Quick mobile test (responsive mode minimum)

---

**Once these are fixed, the Desert Oracle is ready to show Jake!** 🌵✨
