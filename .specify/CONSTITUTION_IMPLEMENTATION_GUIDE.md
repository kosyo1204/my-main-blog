# Constitution Implementation Guide

**my-main-blog Constitution v1.0.0**  
Updated: 2026-02-14

---

## How This Constitution Affects Your Development

### For Every Feature You Build

1. **Planning Phase** (`/speckit.plan`)
   - ✓ Constitution Check gate must pass
   - ✓ Verify alignment with all 4 principles
   - Reference: [.specify/templates/plan-template.md](.specify/templates/plan-template.md#Constitution-Check)

2. **Specification Phase** (`/speckit.spec`)
   - ✓ Add Constitution Compliance Requirements (TR-001 to TR-013)
   - ✓ Define test strategy BEFORE user stories
   - Reference: [.specify/templates/spec-template.md](.specify/templates/spec-template.md#Constitution-Compliance-Requirements)

3. **Task Planning Phase** (`/speckit.tasks`)
   - ✓ Tag all tasks with category: [Test], [Code], [UX], [Perf], [Infra]
   - ✓ Write tests FIRST (Red Phase) before implementation
   - ✓ Include constitutional checkpoints for each user story
   - Reference: [.specify/templates/tasks-template.md](.specify/templates/tasks-template.md#Task-Categories)

4. **Implementation Phase**
   - ✓ Follow Red-Green-Refactor cycle (Principle I)
   - ✓ Run ESLint/Prettier before commit (Principle II)
   - ✓ Use 日本語 for comments and error messages (Principle III)
   - ✓ Monitor bundle size and load time (Principle IV)

5. **Code Review Phase**
   - ✓ Checklist item: TDD compliance (tests written first? Tests passing?)
   - ✓ Checklist item: Code Quality (linting passed? Comments clear? Error handling complete?)
   - ✓ Checklist item: UX Consistency (design system used? Accessibility checked? 日本語 messages?)
   - ✓ Checklist item: Performance (bundle size OK? Load time within targets? Images optimized?)

---

## Principle I: Test-Driven Development

### The Red-Green-Refactor Cycle

```
1. RED PHASE
   └─ Write failing test based on user requirement
   └─ Test documents the expected behavior
   └─ Confirms "problem" exists

2. GREEN PHASE
   └─ Write minimal implementation to pass test
   └─ Test now passes
   └─ Code may be inefficient or not elegant

3. REFACTOR PHASE
   └─ Improve code quality while keeping tests passing
   └─ Remove duplication
   └─ Clarify naming and structure
   └─ Tests prevent regressions
```

### What This Means for You

- **Never write code without a failing test first** (Non-negotiable!)
- Unit tests → Integration tests → E2E tests → Implementation
- Test file exists before implementation file
- All edge cases have explicit tests

### Example Workflow

```bash
# 1. Write failing test (RED)
npm test  # ❌ Test fails as expected

# 2. Write minimal code (GREEN)
# ... implement feature ...
npm test  # ✅ Test passes

# 3. Refactor while keeping tests green (REFACTOR)
# ... improve code ...
npm test  # ✅ Still passing

# 4. Commit with test and implementation
git add src/feature.ts tests/feature.test.ts
git commit -m "feat: add feature with tests"
```

---

## Principle II: Code Quality & Maintainability

### Automated Checks

```bash
# Run before every commit
npm run lint      # ESLint check
npm run format    # Prettier format
npm run test      # All tests
```

### Code Review Checklist

- [ ] Functions/methods have 日本語 comments explaining complex logic
- [ ] Variable names are descriptive (e.g., `userEmail` not `ue`)
- [ ] All error paths are handled (try-catch, validation checks)
- [ ] No console.log() left in production code (use structured logging)
- [ ] Cyclomatic complexity ≤ 10 per function
- [ ] DRY principle followed (no duplicate logic)

### Example

```typescript
// ❌ BAD: Unclear variable names, no error handling
function proc(d) {
  return d.m.map(x => x.p);
}

// ✅ GOOD: Clear names, error handling, 日本語 comment
function extractUserPrices(userData) {
  // ユーザーの各商品の価格を抽出
  if (!userData?.members || !Array.isArray(userData.members)) {
    throw new Error('無効なユーザーデータです');
  }
  
  return userData.members.map(member => {
    if (typeof member.price !== 'number') {
      throw new Error(`商品の価格が無効です: ${member.id}`);
    }
    return member.price;
  });
}
```

---

## Principle III: User Experience Consistency

### Design System Components

Use only approved design system components:
- Buttons, Forms, Cards, Modals, Dialogs, etc.
- Color palette (primary, secondary, error, success, etc.)
- Typography (headings, body, captions)
- Spacing and layout grid

Reference: [Design System Documentation] (TBD)

### Accessibility (WCAG 2.1 Level AA)

```html
<!-- ❌ BAD: Not accessible -->
<div onclick="submit()">Click me</div>

<!-- ✅ GOOD: Keyboard accessible, screen reader friendly -->
<button onClick={submit} aria-label="フォームを送信">
  送信
</button>
```

### 日本語 User Messages

```typescript
// ❌ BAD: English error message
alert('Invalid email format');

// ✅ GOOD: Japanese error with clear action
alert('メールアドレスが無効です。\nフォーマット例: user@example.com');
```

### Response Time Targets

- Page transitions: ≤ 300ms
- Search/filter results: ≤ 1000ms
- Form submissions: Show loading spinner

---

## Principle IV: Performance Requirements

### Performance Budget

```
✓ First Contentful Paint (FCP): ≤ 1.5s
✓ Largest Contentful Paint (LCP): ≤ 2.5s
✓ Main Bundle Size: < 150 KB (gzip)
✓ Total Page Size: < 500 KB (gzip)
✓ Cumulative Layout Shift (CLS): < 0.1
✓ Interaction to Next Paint (INP): < 200ms
```

### Monitoring Tools

```bash
# Run Lighthouse audit
npm run lighthouse

# Check bundle size
npm run analyze-bundle

# Monitor in development
npm run dev  # Includes performance hints
```

### Common Optimizations

```typescript
// ❌ BAD: Lazy loads images
<img src="large-banner.png" width="1200" />

// ✅ GOOD: WebP with srcset + lazy loading
<picture>
  <source 
    srcSet="banner-mobile.webp 1x, banner-mobile-2x.webp 2x"
    media="(max-width: 768px)"
    type="image/webp"
  />
  <img 
    src="banner-fallback.jpg"
    loading="lazy"
    alt="ページの概要"
  />
</picture>
```

### Database Performance

```typescript
// ❌ BAD: N+1 query problem
const posts = await Post.find();
for (const post of posts) {
  post.author = await User.findById(post.authorId); // N queries!
}

// ✅ GOOD: Batch fetch (eager loading)
const posts = await Post.find().populate('author');
```

---

## Language Policy in Action

### Code Comments (日本語)

```typescript
/**
 * ユーザー情報を取得します
 * @param userId - ユーザーID
 * @returns ユーザーオブジェクト
 * @throws 無効なIDが渡された場合、エラーを投げます
 */
async function getUser(userId: string) {
  // ...
}
```

### Error Messages (日本語)

```typescript
const errors = {
  INVALID_EMAIL: 'メールアドレスが無効です',
  USER_NOT_FOUND: 'ユーザーが見つかりません',
  UNAUTHORIZED: 'このアクションを実行する権限がありません',
  SERVER_ERROR: 'サーバーエラーが発生しました。時間をおいてお試しください'
};
```

### Test Scenarios (Given-When-Then in 日本語)

```typescript
describe('ユーザー登録機能', () => {
  test('有効なメールで登録できる', () => {
    // Given (前提条件)
    const user = { email: 'test@example.com', password: 'Pass123!' };
    
    // When (実行)
    const result = register(user);
    
    // Then (期待結果)
    expect(result.success).toBe(true);
    expect(result.userId).toBeDefined();
  });

  test('無効なメールで登録できない', () => {
    // Given
    const user = { email: 'invalid-email', password: 'Pass123!' };
    
    // When
    const result = register(user);
    
    // Then
    expect(result.success).toBe(false);
    expect(result.error).toBe('無効なメールアドレスです');
  });
});
```

---

## Development Workflow Integration

### Branch Strategy
Follow: [docs/git-workflow/BRANCH_STRATEGY.md](docs/git-workflow/BRANCH_STRATEGY.md)

### Commit Messages
Follow: [docs/git-workflow/COMMIT_CONVENTION.md](docs/git-workflow/COMMIT_CONVENTION.md)

### PR Guidelines
Follow: [docs/git-workflow/PR_GUIDELINES.md](docs/git-workflow/PR_GUIDELINES.md)

### Code Review Requirements
- Minimum 1 approval required
- Constitutional compliance verified:
  - ✓ TDD: Tests written before code?
  - ✓ Quality: Linting, complexity, error handling passed?
  - ✓ UX: Design system, accessibility, 日本語 messages OK?
  - ✓ Performance: Bundle size, load time within targets?

---

## Common Questions

### Q: Can I write tests after the code?
**A**: No. Principle I (TDD) is **NON-NEGOTIABLE**. Tests must be written first. This ensures the code actually solves the problem before you optimize it.

### Q: Can I use English for comments?
**A**: Not preferred. The primary language is 日本語. Use English only for technical terms without a clear Japanese equivalent.

### Q: What if a performance target seems impossible?
**A**: Document the blocker in your PR description and discuss with the team. Performance requirements may be adjusted based on technical constraints, but they should be the baseline.

### Q: Do I need ALL of Code Review, UX, and Performance in every PR?
**A**: Yes. Every PR is reviewed against all 4 principles. However, some features may focus more on one principle (e.g., an image optimization task focuses on Principle IV).

---

## Emergency Contact / Questions

If constitutional requirements are unclear or seem impossible:

1. **Create a GitHub Issue** with the specific concern
2. **Include**: Feature name, specific principle in question, why it's challenging
3. **Timeline**: Issues flagged as "constitution-clarification" should be resolved within 1 sprint

Constitutional amendments require 2-person consensus from core developers + documentation.

---

**Last Updated**: 2026-02-14  
**Constitution Version**: 1.0.0  
**Document Version**: 1.0.0
