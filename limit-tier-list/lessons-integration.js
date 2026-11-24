window.THEOREM_LESSONS = {
  "mct": {
    "title": "Integrate a nonnegative series without knowing its sum",
    "goal": "Evaluate $$I=\\int_0^1\\frac{-\\log(1-x)}x\\,dx.$$ The integrand is awkward near $x=1$, so a term-by-term integral is tempting, but the series is not uniformly convergent on $(0,1)$.",
    "steps": [
      [
        "Choose an increasing approximation",
        "For $0<x<1$, the logarithm series gives $$\\frac{-\\log(1-x)}x=\\sum_{k=1}^{\\infty}\\frac{x^{k-1}}k.$$ Put $f_N(x)=\\sum_{k=1}^N x^{k-1}/k$. Each $f_N$ is measurable and nonnegative. Since every added term is nonnegative, $f_N\\uparrow f$ pointwise."
      ],
      [
        "Invoke the theorem at the exact step",
        "Monotone convergence, not mere pointwise convergence, justifies $$I=\\lim_{N\\to\\infty}\\int_0^1 f_N(x)\\,dx.$$ Finite linearity then gives $$I=\\lim_{N\\to\\infty}\\sum_{k=1}^N\\frac1{k^2}.$$"
      ],
      [
        "Finish the calculation",
        "Using Euler's evaluation of the Basel series, $$I=\\sum_{k=1}^\\infty\\frac1{k^2}=\\frac{\\pi^2}{6}.$$ No integrable dominating function or prior finiteness of $I$ had to be established."
      ]
    ],
    "why": "Nonnegativity alone is not enough. For $f_n=n\\mathbf1_{(0,1/n)}$ on $(0,1)$, the limit is zero but all integrals equal one. The sequence is not increasing; its mass concentrates near the missing endpoint.",
    "intuition": "Think of the partial sums as adding layers of area. No layer is ever removed. The total area of all layers is therefore the limit of the areas already accumulated."
  },
  "dct": {
    "title": "A limit with an infinite integration domain",
    "goal": "Find $$\\lim_{n\\to\\infty}\\int_0^\\infty e^{-x}\\cos(x/n)\\,dx.$$ We want to move the limit inside, although the interval has infinite length and the functions can change sign.",
    "steps": [
      [
        "Find the pointwise limit",
        "For each fixed $x\\ge0$, $x/n\\to0$ and hence $$f_n(x)=e^{-x}\\cos(x/n)\\to e^{-x}.$$ All the functions are continuous and thus measurable."
      ],
      [
        "Find one integrable envelope",
        "For all $n$ and all $x\\ge0$, $$|f_n(x)|\\le e^{-x}=g(x).$$ The envelope is integrable: $\\int_0^\\infty g(x)\\,dx=1$. The bound is independent of $n$."
      ],
      [
        "Make the interchange",
        "The dominated convergence theorem applies, so $$\\lim_{n\\to\\infty}\\int_0^\\infty f_n(x)\\,dx$$ $$=\\int_0^\\infty\\lim_{n\\to\\infty}f_n(x)\\,dx$$ $$=\\int_0^\\infty e^{-x}\\,dx=1.$$ There was no need to evaluate the original integrals individually."
      ]
    ],
    "why": "On $[0,\\infty)$, $f_n=\\mathbf1_{[n,n+1]}$ tends pointwise to zero, but its integral is always one. A bound by the constant $1$ does not help: it is not integrable on this domain. In fact no integrable common envelope exists.",
    "intuition": "The envelope controls both tall spikes and mass escaping to infinity. Far away, all functions have uniformly little total area; on the remaining part their pointwise convergence can safely be converted into convergence of integrals."
  },
  "fatou": {
    "title": "Prove that a limit has finite energy",
    "goal": "Suppose measurable $u_n$ on $(0,1)$ converge almost everywhere to $u$, and $$\\int_0^1|u_n|^2\\,dx\\le 3$$ for every $n$. Is the limit square-integrable? We have no common dominating function.",
    "steps": [
      [
        "Apply the nonlinear operation first",
        "Continuity of the square of the absolute value gives $$|u_n(x)|^2\\to |u(x)|^2$$ almost everywhere. Put $f_n=|u_n|^2$. These are measurable and nonnegative."
      ],
      [
        "Use an inequality, not an equality",
        "Fatou's lemma gives the exact bound $$\\int_0^1|u|^2\\,dx$$ $$\\le\\liminf_{n\\to\\infty}\\int_0^1|u_n|^2\\,dx$$ $$\\le3.$$ The lemma does not assert that the integrals converge to the integral of the limit."
      ],
      [
        "Interpret the conclusion",
        "We have proved $u\\in L^2(0,1)$ and $\\|u\\|_2\\le\\sqrt3$. This is a typical lower-semicontinuity argument in analysis and variational problems."
      ]
    ],
    "why": "The bound need not be an equality: $u_n=\\sqrt n\\,\\mathbf1_{(0,1/n)}$ tends to zero but $\\|u_n\\|_2^2=1$. Dropping nonnegativity from Fatou is also unsafe: $f_n=-n\\mathbf1_{(0,1/n)}$ would give the false inequality $0\\le-1$.",
    "intuition": "Fatou is the theorem to use when you need a lower bound on the limiting energy rather than an exact exchange. A concentrating sequence may lose energy when taking the pointwise limit, but it cannot gain nonnegative energy in that limit."
  },
  "fubini": {
    "title": "Reverse a difficult order of integration",
    "goal": "Evaluate $$I=\\int_0^1\\left(\\int_y^1 e^{-x^2}\\,dx\\right)dy.$$ The inner integral has no elementary antiderivative. Switching the order reveals an easy one.",
    "steps": [
      [
        "Describe the region",
        "The integration region is $D=\\{(x,y):0\\le y\\le x\\le1\\}$. Extend $e^{-x^2}$ by zero off $D$ inside the unit square: $f(x,y)=e^{-x^2}\\mathbf1_D(x,y)$."
      ],
      [
        "Verify absolute integrability",
        "The two Lebesgue spaces on $[0,1]$ are finite and thus $\\sigma$-finite. The function is measurable and $|f|\\le1$, hence $$\\int_{[0,1]^2}|f|\\,d(x,y)\\le1.$$ Fubini applies. Tonelli would also suffice here because the integrand is nonnegative."
      ],
      [
        "Swap and compute",
        "For fixed $x$, the allowed values of $y$ are $0\\le y\\le x$. Thus $$I=\\int_0^1\\int_0^x e^{-x^2}\\,dy\\,dx$$ $$=\\int_0^1 xe^{-x^2}\\,dx$$ $$=\\frac{1-e^{-1}}2.$$"
      ]
    ],
    "why": "Absolute integrability matters for signed functions. On $(0,1)^2$, take $$f(x,y)=\\frac{x^2-y^2}{(x^2+y^2)^2}.$$ Integrating first in $x$ gives $-\\pi/4$ after the outer integral; integrating first in $y$ gives $\\pi/4$. Both iterated integrals exist, yet differ. Fubini's absolute-integrability hypothesis fails.",
    "intuition": "The same two-dimensional region can be sliced horizontally or vertically. Absolute integrability guarantees that cancellation among positive and negative slices cannot produce an order-dependent answer."
  },
  "tonelli": {
    "title": "Turn an integral into a sum before proving it is finite",
    "goal": "Find $$I=\\int_0^1\\frac{dx}{1-x^2}.$$ The geometric expansion is nonnegative, but the integrand is singular near $1$. Is it legitimate to swap an integral with a potentially divergent series?",
    "steps": [
      [
        "Introduce a counting-measure variable",
        "For $0<x<1$, $$\\frac1{1-x^2}=\\sum_{n=0}^{\\infty}x^{2n}.$$ Regard $f(x,n)=x^{2n}$ as a nonnegative measurable function on $(0,1)\\times\\mathbb N_0$. Lebesgue measure and counting measure are $\\sigma$-finite."
      ],
      [
        "Apply Tonelli",
        "Because the function is nonnegative, Tonelli gives $$\\int_0^1\\sum_{n=0}^{\\infty}x^{2n}\\,dx$$ $$=\\sum_{n=0}^{\\infty}\\int_0^1x^{2n}\\,dx$$ $$=\\sum_{n=0}^{\\infty}\\frac1{2n+1}.$$ Both sides are allowed to be infinite."
      ],
      [
        "Determine the value",
        "The final sum diverges, since $1/(2n+1)\\ge1/(2n+2)$ and the harmonic series diverges. Consequently $I=+\\infty$. We never assumed integrability to justify the exchange."
      ]
    ],
    "why": "For signed double series, Tonelli is unavailable. Let $a_{mn}=1$ when $m=n$, $a_{mn}=-1$ when $n=m+1$, and zero otherwise ($m,n\\ge1$). Every row sums to zero, but the column sums are $1,0,0,\\ldots$. The iterated sums are $0$ and $1$.",
    "intuition": "Tonelli is the infinite-dimensional version of adding nonnegative entries in a grid. It does not require knowing the total beforehand: the total is the supremum of finite sums."
  },
  "uniform-integral": {
    "title": "Integrate a series with a uniform tail bound",
    "goal": "Compute $$I=\\int_0^1\\frac{dx}{2-x}.$$ Imagine that the rational function is known through its series expansion rather than an antiderivative.",
    "steps": [
      [
        "Write the finite approximations",
        "For $x\\in[0,1]$, $$\\frac1{2-x}=\\sum_{n=0}^\\infty\\frac{x^n}{2^{n+1}}.$$ Let $S_N$ be the partial sum through $n=N$. Each is continuous."
      ],
      [
        "Prove uniform convergence",
        "Since $|x|\\le1$, the tail satisfies $$|f(x)-S_N(x)|\\le\\sum_{n=N+1}^\\infty 2^{-n-1}$$ $$=2^{-N-1}\\longrightarrow0.$$ The bound does not depend on $x$."
      ],
      [
        "Pass through the integral",
        "By the uniform limit theorem for Riemann integrals, $$I=\\lim_{N\\to\\infty}\\int_0^1 S_N(x)\\,dx$$ $$=\\sum_{n=0}^\\infty\\frac{1}{2^{n+1}(n+1)}.$$ Reindexing yields $\\sum_{k\\ge1}2^{-k}/k=\\log2$. The integral of the tail is at most $2^{-N-1}$."
      ]
    ],
    "why": "Pointwise convergence alone fails even for continuous functions on a compact interval. Let $f_n(x)=n^2x(1-x)^n$ on $[0,1]$. It converges pointwise to zero, but $$\\int_0^1 f_n(x)\\,dx=\\frac{n^2}{(n+1)(n+2)}\\to1.$$",
    "intuition": "Uniform convergence places the entire error graph inside a horizontal strip of height tending to zero. On a finite interval the area of this strip tends to zero as well."
  },
  "uniform-cont": {
    "title": "Prove continuity of an infinite trigonometric series",
    "goal": "Consider $$F(x)=\\sum_{n=1}^\\infty\\frac{\\sin(nx)}{n^2}.$$ Is $F$ continuous at a point $a$? An infinite sum of continuous functions need not automatically be continuous.",
    "steps": [
      [
        "Control the approximation everywhere",
        "Each partial sum $S_N$ is continuous on $\\mathbb R$. Since $|\\sin(nx)/n^2|\\le1/n^2$ and $\\sum n^{-2}<\\infty$, the M-test gives uniform convergence $S_N\\to F$."
      ],
      [
        "Identify the double limit",
        "By the uniform limit theorem, $$\\lim_{x\\to a}\\lim_{N\\to\\infty}S_N(x)$$ $$=\\lim_{N\\to\\infty}\\lim_{x\\to a}S_N(x).$$ The inner limit on the right is $S_N(a)$ by continuity of the finite sum."
      ],
      [
        "Conclude",
        "Thus $$\\lim_{x\\to a}F(x)=\\lim_N S_N(a)=F(a).$$ For example, $F(x)\\to0$ as $x\\to0$ even though infinitely many frequencies occur in the series."
      ]
    ],
    "why": "The functions $f_n(x)=x^n$ are continuous on $[0,1]$, but the pointwise limit is zero for $x<1$ and one at $1$. Indeed $\\lim_{x\\uparrow1}\\lim_n x^n=0$, whereas $\\lim_n\\lim_{x\\uparrow1}x^n=1$.",
    "intuition": "For an epsilon argument, you need one finite approximation that is good both at the point and at every nearby point. Uniform convergence supplies exactly that approximation."
  },
  "uniform-derivative": {
    "title": "Differentiate an infinite series safely",
    "goal": "Let $$F(x)=\\sum_{n=1}^\\infty\\frac{\\sin(nx)}{n^3}.$$ Is it legitimate to differentiate every summand and add the results?",
    "steps": [
      [
        "Check the derivative series",
        "On any interval $[-R,R]$, the partial sums $S_N$ are $C^1$ and $$S_N'(x)=\\sum_{n=1}^N\\frac{\\cos(nx)}{n^2}.$$ The bound $|\\cos(nx)|/n^2\\le1/n^2$ gives uniform convergence of the derivatives by the M-test."
      ],
      [
        "Anchor the constants",
        "At $x_0=0$, $S_N(0)=0$ for all $N$, so the required convergence at one point holds. Uniform convergence of derivatives alone would not control arbitrary additive constants."
      ],
      [
        "Interchange derivative and sum",
        "The uniform derivative theorem now gives $$\\frac{d}{dx}\\lim_N S_N(x)=\\lim_N S_N'(x).$$ Therefore $$F'(x)=\\sum_{n=1}^\\infty\\frac{\\cos(nx)}{n^2}.$$ In particular, $F'(0)=\\pi^2/6$. As $R$ was arbitrary, the formula holds on all of $\\mathbb R$."
      ]
    ],
    "why": "Uniform convergence of $f_n$ is not sufficient: $f_n(x)=\\sin(nx)/n$ tends uniformly to zero, whose derivative is zero, but $f_n'(0)=1$ for every $n$. Conversely, $f_n(x)=n$ has zero derivatives but no finite limit even at one point.",
    "intuition": "Integration reconstructs each function from its slope and one starting value. If the slopes converge uniformly and the starting values converge, the reconstructed functions and their derivatives have compatible limits."
  }
};
