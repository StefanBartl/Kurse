# Enterprise UI Development: Testing & Code Quality / Steve Kinney, Temporal / Ende Oktober 23

**In ./Kursmaterialien:**
[Code Repo](https://github.com/stevekinney/enterprise-ui-dev)
[Course Slides](https://static.frontendmasters.com/assets/courses/2023-05-26-enterprise-ui-dev/enterprise-ui-dev-slides.pdf)

## Takeaways

## Vitest

**Setup:**

`npm install -D vitest`

Next, in order to execute the test, add the following section to your package.json:

    ```json
    {
    "scripts": {
        "test": "vitest"
    }
    }
    ```

Finally, run npm run test, yarn test, or pnpm test.

### Vitest API

[Vitest Api](https://vitest.dev/api/)

`import { expect, test } from 'vitest'`:
Import Vitest

`.toBeCloseTo()`:
Using exact equality with floating point numbers is a bad idea. Rounding means that intuitive things fail. The default for numDigits is 2.
