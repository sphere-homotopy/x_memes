Object.assign(window.THEOREM_LESSONS, {
  "m-test": {
    "title": "Justify a limit at a boundary point of a function series",
    "goal": "Find $$\\lim_{x\\to0}\\sum_{n=1}^\\infty\\frac{1-\\cos(nx)}{n^2}.$$ Each term tends to zero, but that alone does not show the infinite sum does.",
    "steps": [
      [
        "Find a numerical majorant",
        "Let $f_n(x)=(1-\\cos(nx))/n^2$. For every real $x$, $$|f_n(x)|\\le\\frac2{n^2}=M_n.$$ The numerical series $\\sum M_n$ converges."
      ],
      [
        "Obtain a uniform tail estimate",
        "The M-test gives uniform convergence on $\\mathbb R$. More explicitly, $$\\sup_x\\left|\\sum_{n>N}f_n(x)\\right|\\le2\\sum_{n>N}n^{-2}\\le\\frac2N.$$ Thus choose $N$ before choosing a neighborhood of zero."
      ],
      [
        "Use the uniform limit theorem",
        "The finite partial sums are continuous. Uniform convergence therefore justifies $$\\lim_{x\\to0}\\sum_{n=1}^\\infty f_n(x)$$ $$=\\sum_{n=1}^\\infty\\lim_{x\\to0} f_n(x)=0.$$ The M-test provides uniform convergence; the uniform limit theorem performs the actual interchange."
      ]
    ],
    "why": "The test is sufficient, not necessary. The numerical alternating harmonic series, regarded as constant functions, converges uniformly but no summable absolute majorant exists. Conversely, just bounding every $f_n$ by $1$ says nothing about convergence of the sum.",
    "intuition": "A budget for every term gives a budget for the entire infinite tail, uniformly in the input. You can then ignore the tail before taking a limit."
  },
  "moore": {
    "title": "Exchange two approximation parameters",
    "goal": "Determine whether the order of limits matters for $$a_{mn}=\\frac{n}{n+1}+\\frac{\\sin(mn)}m,$$ where $m,n$ are positive integers. The second term oscillates with $n$, so direct application of Moore–Osgood requires care.",
    "steps": [
      [
        "Choose a version with both inner limits",
        "For fixed $n$, $a_{mn}\\to b_n=n/(n+1)$, uniformly in $n$, since $|a_{mn}-b_n|\\le1/m$. But for fixed $m$, the sine term need not converge as $n\\to\\infty$. Thus this array does not satisfy the theorem as stated. Replace the oscillation by a decaying factor and study $$A_{mn}=\\frac{n}{n+1}+\\frac{\\sin(mn)}{m(n+1)}.$$"
      ],
      [
        "Verify both hypotheses",
        "For fixed $n$, $A_{mn}\\to b_n=n/(n+1)$, with $$\\sup_n|A_{mn}-b_n|\\le\\frac1m\\to0.$$ For each fixed $m$, $A_{mn}\\to c_m=1$ as $n\\to\\infty$, since the sine term is bounded by $1/[m(n+1)]$."
      ],
      [
        "Exchange the limits",
        "Moore–Osgood gives $$\\lim_m\\lim_n A_{mn}=\\lim_n\\lim_m A_{mn}$$ $$=\\lim_{m,n\\to\\infty}A_{mn}=1.$$ In particular the same result holds along any sequence $(m_j,n_j)$ tending jointly to infinity."
      ]
    ],
    "why": "Without uniformity, $a_{mn}=m/(m+n)$ has iterated limits $0$ and $1$. Along $m=n$ the joint value is $1/2$. Along $m=n^2$ it tends to $1$. Knowing both inner limits exist does not control the diagonal.",
    "intuition": "Imagine a grid of values. Uniform convergence means that once a row index is large enough, every column is close to its limiting value. This prevents a diagonal path through exceptional entries from changing the answer."
  },
  "leibniz": {
    "title": "Evaluate a logarithmic integral by differentiating a parameter",
    "goal": "For $t>-1$, compute $$F(t)=\\int_0^1\\frac{\\log(1+tx)}x\\,dx.$$ Direct evaluation leads to a special function. Differentiating with respect to $t$ turns the problem into an elementary integral.",
    "steps": [
      [
        "Set up the derivative and check measurability",
        "For $0<x\\le1$, put $f(t,x)=\\log(1+tx)/x$. It is continuous in $x$ there, and differentiable in $t>-1$, with $$\\partial_t f(t,x)=\\frac1{1+tx}.$$ At $t_0=0$, $f(0,x)=0$ is integrable."
      ],
      [
        "Check a common local envelope",
        "Fix any $T\\in(-1,\\infty)$ and choose an open bounded interval $I$ containing both $0$ and $T$, with lower endpoint $a>-1$. For $t\\in I$, $1+tx\\ge\\min(1,1+a)>0$. Hence $|\\partial_t f|\\le1/\\min(1,1+a)$, an integrable constant on $(0,1)$."
      ],
      [
        "Differentiate under the integral",
        "The Leibniz/DCT rule now justifies $$F'(t)=\\int_0^1\\frac1{1+tx}\\,dx$$ $$=\\begin{cases}\\log(1+t)/t,&t\\ne0,\\\\1,&t=0.\\end{cases}$$ Since $F(0)=0$, we recover $$F(t)=\\int_0^t\\frac{\\log(1+s)}s\\,ds.$$ The integrand at $s=0$ is understood by its continuous extension. This identifies the original function by its elementary derivative."
      ]
    ],
    "why": "A pointwise derivative under the integral is not enough. Let $F(t)=\\int_0^1 t^{-1}\\mathbf1_{(0,t)}(x)\\,dx$ for $0<t<1$, and define $f(0,x)=0$. For each fixed $x>0$, $f(t,x)$ vanishes near zero and has right derivative zero there. Yet $F(t)=1$ for $t>0$ and $F(0)=0$, so $F$ is not even continuous at zero.",
    "intuition": "A derivative is itself a limit of difference quotients. The derivative bound, via the mean value estimate, dominates those quotients uniformly; DCT then justifies passing that limit through the integral."
  },
  "abel": {
    "title": "Recover the alternating harmonic sum at the edge of a disk",
    "goal": "Find $$S=\\sum_{n=0}^\\infty\\frac{(-1)^n}{n+1}.$$ The power series for $\\log(1+r)$ is known for $|r|<1$. But plugging in $r=1$ is a boundary operation, not automatically justified by the power series theorem.",
    "steps": [
      [
        "Verify convergence at the endpoint",
        "Set $a_n=(-1)^n/(n+1)$. The positive magnitudes decrease to zero, so the alternating series test proves $\\sum a_n$ converges. Its sum is not yet known. Absolute convergence fails, because the harmonic series diverges."
      ],
      [
        "Compute the interior generating function",
        "For $0<r<1$, the geometric series for $1/(1+t)$ converges uniformly on $[0,r]$. Integrating term by term gives $$\\log(1+r)=\\sum_{n=0}^\\infty\\frac{(-1)^n r^{n+1}}{n+1}.$$ Dividing by $r$, $$\\frac{\\log(1+r)}r=\\sum_{n=0}^\\infty a_n r^n.$$"
      ],
      [
        "Pass to the boundary using Abel",
        "Since the endpoint series converges, Abel's theorem gives $$\\sum_{n=0}^\\infty a_n=\\lim_{r\\uparrow1}\\sum_{n=0}^\\infty a_n r^n.$$ Consequently $$S=\\lim_{r\\uparrow1}\\frac{\\log(1+r)}r=\\log2.$$ This is precisely the transition not covered by convergence on smaller disks."
      ]
    ],
    "why": "The converse is false: $\\sum_{n=0}^\\infty(-1)^n$ diverges, while $\\sum(-1)^nr^n=1/(1+r)\\to1/2$. Having a finite Abel limit does not imply ordinary convergence; additional Tauberian hypotheses are needed.",
    "intuition": "The power series is a weighted average of the partial sums. As r increases to one, the weight assigned to any fixed finite initial segment vanishes. If the partial sums have a limit, the average must approach that same limit."
  },
  "dirichlet": {
    "title": "Establish continuity of a conditionally convergent Fourier series away from endpoints",
    "goal": "Study $$F(x)=\\sum_{n=1}^\\infty\\frac{\\sin(nx)}n.$$ The absolute majorant $\\sum1/n$ diverges, so the M-test cannot directly establish uniform convergence.",
    "steps": [
      [
        "Bound the oscillatory partial sums",
        "Fix $0<\\delta<\\pi$ and let $E=[\\delta,2\\pi-\\delta]$. The finite geometric identity gives $$\\sum_{n=1}^N e^{inx}=\\frac{e^{ix}(1-e^{iNx})}{1-e^{ix}}.$$ Since $|1-e^{ix}|=2|\\sin(x/2)|$, the magnitude is at most $1/\\sin(\\delta/2)$ for every $N$ and $x\\in E$. Taking imaginary parts gives the same bound for the sine sums."
      ],
      [
        "Check the decreasing weights",
        "Choose $a_n(x)=\\sin(nx)$ and $b_n(x)=1/n$. These weights decrease to zero uniformly on $E$. The uniform Dirichlet test therefore proves uniform convergence of $F$ on $E$, despite the divergent absolute majorant."
      ],
      [
        "Use that convergence to interchange",
        "For $a\\in E$, the uniform limit theorem gives $$\\lim_{\\substack{x\\to a\\\\x\\in E}}F(x)=\\sum_{n=1}^\\infty\\frac{\\sin(na)}n.$$ In particular, the sum is continuous throughout $(0,2\\pi)$, since each interior point lies in some such interval. Dirichlet supplies the uniform convergence needed for the exchange."
      ]
    ],
    "why": "The uniform bound on the partial sums can blow up near $x=0$. In fact the series is not uniformly convergent on $[0,2\\pi]$: its sum equals $(\\pi-x)/2$ for $0<x<2\\pi$ (the standard Fourier sawtooth identity), but is zero at $0$. A uniform limit of continuous functions could not have this jump.",
    "intuition": "Large positive and negative sine terms cancel in partial sums. Multiplying by decreasing weights preserves enough cancellation to make every late tail uniformly small, away from resonant endpoints."
  },
  "abel-test": {
    "title": "Multiply a conditionally convergent series by parameter-dependent weights",
    "goal": "Consider $$F(x)=\\sum_{n=1}^\\infty\\frac{(-1)^{n-1}}n\\frac{nx}{1+nx},\\quad 0\\le x\\le1.$$ Can we move the limit $x\\downarrow0$ inside this series? The obvious absolute majorant is the divergent harmonic series.",
    "steps": [
      [
        "Check uniform convergence of the unweighted series",
        "The functions $a_n(x)=(-1)^{n-1}/n$ are constant in $x$. Their series converges by the alternating series test, hence converges uniformly on $[0,1]$."
      ],
      [
        "Verify the weights",
        "Put $b_n(x)=nx/(1+nx)$. For each $x\\ge0$, $b_n(x)$ is nondecreasing in $n$, and $$0\\le b_n(x)\\le1.$$ They need not tend uniformly to any function; Abel's uniform test requires only monotonicity and uniform boundedness."
      ],
      [
        "Apply Abel, then exchange the limit",
        "The weighted series converges uniformly. Each summand is continuous and is zero at $x=0$. Therefore $$\\lim_{x\\downarrow0}\\sum_{n=1}^\\infty a_n(x)b_n(x)$$ $$=\\sum_{n=1}^\\infty\\lim_{x\\downarrow0}a_n(x)b_n(x)=0.$$ Uniform convergence, furnished by Abel's test, is what licenses the equality."
      ]
    ],
    "why": "Boundedness without monotonicity does not suffice: take $a_n=(-1)^{n-1}/n$ and $b_n=(-1)^{n-1}$. The weighted terms become $1/n$, so the sum diverges. The weights destroy the very cancellations responsible for convergence.",
    "intuition": "Summation by parts rewrites the weighted tail using unweighted partial tails and differences of adjacent weights. Monotone bounded weights have bounded total variation, so they cannot amplify the uniformly small tails without bound."
  },
  "power": {
    "title": "Differentiate a power series to sum a new one",
    "goal": "Find a closed form for $$S(z)=\\sum_{n=1}^\\infty n z^{n-1},\\quad |z|<1.$$ We know the geometric series, but differentiating infinitely many terms requires justification.",
    "steps": [
      [
        "Start with the geometric series",
        "For $|z|<1$, $$G(z)=\\sum_{n=0}^\\infty z^n=\\frac1{1-z}.$$ The radius of convergence is one, by the root test."
      ],
      [
        "Verify local uniform control",
        "On any disk $|z|\\le r<1$ with $r>0$, the original terms are bounded by $r^n$, and derivative terms by $nr^{n-1}$. Both majorant series converge by the ratio test. Thus the series and derivative series converge uniformly on every smaller disk."
      ],
      [
        "Interchange differentiation and summation",
        "The power series theorem gives $$G'(z)=\\sum_{n=1}^\\infty n z^{n-1}.$$ Differentiating the closed form yields $$S(z)=\\frac1{(1-z)^2}.$$ For instance at $z=1/2$, the series equals $4$."
      ]
    ],
    "why": "Boundary points are not covered. The series $\\sum_{n=1}^\\infty z^n/n^2$ converges even at $z=1$, but its derivative series there is $\\sum1/n$, which diverges. Interior analyticity does not guarantee a finite boundary derivative.",
    "intuition": "Inside the disk there is an extra geometric factor available to pay for differentiation, which introduces a factor of n. At the boundary that geometric margin disappears."
  },
  "absolute-series": {
    "title": "Swap an infinite double sum by absolute convergence",
    "goal": "Evaluate $$S=\\sum_{m=1}^\\infty\\sum_{n=1}^\\infty\\frac{(-1)^m}{2^{m+n}}.$$ We want to sum first over $m$, or enumerate the pairs diagonally, without changing the total.",
    "steps": [
      [
        "Check the total absolute mass",
        "Using nonnegative geometric sums (Tonelli), $$\\sum_{m,n\\ge1}\\frac1{2^{m+n}}$$ $$=\\left(\\sum_{m=1}^\\infty2^{-m}\\right)^2=1.$$ Thus any enumeration of the pairs yields an absolutely convergent numerical series."
      ],
      [
        "Justify the new grouping",
        "Absolute rearrangement allows reordering the enumerated terms; consecutive finite blocks can also be grouped without changing the sum. More generally, the sums over increasing finite subsets converge to the same total, so the two iterated sums agree (equivalently by Fubini for counting measure)."
      ],
      [
        "Compute in the new order",
        "Hence $$S=\\sum_{n=1}^\\infty2^{-n}\\sum_{m=1}^\\infty(-1/2)^m$$ $$=\\left(1\\right)\\left(-\\frac13\\right)=-\\frac13.$$ Any diagonal enumeration gives this same value."
      ]
    ],
    "why": "The alternating harmonic series has positive and negative subseries that diverge separately. By selecting positive terms until exceeding a target $L$, then negative terms until falling below it, and repeating, one obtains a rearrangement converging to $L$. Absolute convergence prevents this behavior.",
    "intuition": "After selecting finitely many terms containing almost all of the absolute mass, everything left has arbitrarily small total magnitude, regardless of ordering."
  },
  "cauchy-product": {
    "title": "Multiply an absolutely convergent series by a conditional one",
    "goal": "Let $$A=\\sum_{n=0}^\\infty 2^{-n}=2,$$ $$B=\\sum_{n=0}^\\infty\\frac{(-1)^n}{n+1}=\\log2.$$ We want the product as a single series grouped by total index, even though $B$ is only conditionally convergent.",
    "steps": [
      [
        "Check Mertens' hypotheses",
        "The geometric series $A$ converges absolutely. The alternating harmonic series $B$ converges by the alternating series test. Hence both converge and at least one does absolutely."
      ],
      [
        "Construct the finite diagonals",
        "The Cauchy product coefficients are $$c_n=\\sum_{k=0}^n\\frac{2^{-k}(-1)^{n-k}}{n-k+1}.$$ Each is a finite sum, so its definition involves no unjustified infinite rearrangement."
      ],
      [
        "Pass from finite products to the infinite series",
        "Mertens' theorem licenses the triangular grouping: $$\\sum_{n=0}^\\infty c_n=AB=2\\log2.$$ We cannot simply claim all double terms are absolutely summable: their absolute sum is infinite. Mertens is stronger here than the absolute rearrangement argument."
      ]
    ],
    "why": "If both factors are only conditionally convergent, the conclusion may fail. Take $a_n=b_n=(-1)^n/\\sqrt{n+1}$. Both series converge, but $$|c_n|=\\sum_{k=0}^n\\frac1{\\sqrt{(k+1)(n-k+1)}}$$ $$\\ge\\frac{2(n+1)}{n+2}\\to2.$$ The product terms do not tend to zero.",
    "intuition": "The triangular partial sums combine one sequence with partial sums of the other. The absolutely summable factor acts as a stable set of weights; the other factor only needs bounded partial sums converging to its sum."
  }
});
