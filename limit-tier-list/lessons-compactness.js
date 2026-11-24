Object.assign(window.THEOREM_LESSONS, {
  "vitali": {
    "title": "Pass to the integral when there is no common dominating function",
    "goal": "On $(0,1)$, let $$f_n(x)=\\frac n{\\log(n+1)}\\mathbf1_{(0,1/n)}(x).$$ Find the limit of the integrals using convergence in measure and uniform integrability. DCT cannot be used with a single integrable envelope.",
    "steps": [
      [
        "Check convergence in measure",
        "For each fixed $x>0$, eventually $x>1/n$, so $f_n(x)=0$. More explicitly, for every $\\varepsilon>0$, $$\\mu(\\{|f_n|>\\varepsilon\\})\\le\\frac1n\\to0.$$ Each $f_n$ is measurable and integrable."
      ],
      [
        "Prove uniform integrability",
        "The integral of $|f_n|$ is $1/\\log(n+1)$. Given $\\varepsilon>0$, choose $N$ so that this is below $\\varepsilon$ for all $n\\ge N$. For the finitely many $n<N$, choose $K$ greater than all their heights. Then their tails above $K$ vanish, and for the remaining $n$ the tail integral is at most $\\varepsilon$. Thus $$\\sup_n\\int_{\\{|f_n|>K\\}} |f_n|\\,dx\\to0.$$"
      ],
      [
        "Apply Vitali",
        "The interval has finite measure, and both required conditions hold. Therefore $$\\|f_n-0\\|_1\\to0,$$ and in particular $$\\lim_n\\int_0^1 f_n\\,dx=\\int_0^1\\lim_n f_n\\,dx=0.$$ Here the individual integrals are easy to compute; the point is to see exactly why the theorem works without an envelope."
      ]
    ],
    "why": "A common dominating $g$ would satisfy $g(x)\\ge n/\\log(n+1)$ on $(1/(n+1),1/n)$, up to null sets. Integrating over these disjoint intervals forces $\\int g\\ge\\sum_{n\\ge1}1/[(n+1)\\log(n+1)]=\\infty$. By contrast, removing the logarithm gives spikes of constant area one, which fail uniform integrability and do not converge in $L^1$.",
    "intuition": "Vitali controls the amount of mass at large function values, rather than requiring the same envelope at every point. On a finite space, low values are controlled by convergence in measure and high values by uniform integrability."
  },
  "bounded": {
    "title": "Average a bounded oscillatory approximation",
    "goal": "Compute $$\\lim_{n\\to\\infty}\\int_0^1\\frac{n x}{1+n x}\\,dx.$$ The convergence is not uniform near zero, so the uniform integral theorem is not available.",
    "steps": [
      [
        "Find the almost-everywhere limit",
        "For $x>0$, $nx\\to\\infty$, so $$f_n(x)=\\frac{nx}{1+nx}\\to1.$$ At zero all terms are zero, but a single point has measure zero. Every $f_n$ is continuous."
      ],
      [
        "Verify the finite-space bound",
        "For every $x\\in[0,1]$ and every $n$, $0\\le f_n(x)\\le1$. The interval has measure one. Thus the bounded convergence theorem applies with $M=1$."
      ],
      [
        "Exchange and evaluate",
        "$$\\lim_n\\int_0^1 f_n(x)\\,dx$$ $$=\\int_0^1\\lim_n f_n(x)\\,dx=1.$$ Indeed, the individual integrals are $1-\\log(1+n)/n$, which confirms the limit. The theorem avoids that calculation."
      ]
    ],
    "why": "On an infinite measure space, uniform boundedness is not enough: the indicators $\\mathbf1_{[n,n+1]}$ are bounded by one and tend pointwise to zero, but their integrals equal one. Finite total measure makes the constant bound integrable.",
    "intuition": "On a finite domain, a region of bad approximation contributes at most its measure times the common height bound. There is no way to hide a fixed amount of mass on a vanishingly small region with bounded height."
  },
  "weak-port": {
    "title": "Use a limiting distribution to compute probabilities and expectations",
    "goal": "Let $U$ be uniform on $[0,1]$ and $X_n=\\lfloor nU\\rfloor/n$. We want the limit of $\\mathbb P(X_n\\le1/3)$ and $\\mathbb E[X_n^2]$ without explicitly summing the discrete law.",
    "steps": [
      [
        "Establish weak convergence",
        "We have $|X_n-U|\\le1/n$ almost surely. For any bounded continuous $h$, $h(X_n)\\to h(U)$ almost surely and $|h(X_n)|\\le\\|h\\|_\\infty$. By bounded convergence, $$\\mathbb E[h(X_n)]\\to\\mathbb E[h(U)].$$ This is exactly weak convergence of their probability laws."
      ],
      [
        "Check the discontinuity set",
        "The event $A=(-\\infty,1/3]$ has boundary $\\{1/3\\}$. The uniform law $\\mu$ assigns it zero mass. Portmanteau therefore permits replacing the discrete law by the limiting law even for this discontinuous indicator: $$\\lim_n\\mathbb P(X_n\\le1/3)$$ $$=\\mathbb P(U\\le1/3)=\\frac13.$$"
      ],
      [
        "Pass an expectation to the limit",
        "On $[0,1]$, $h(x)=x^2$ is bounded and continuous. Weak convergence on this compact interval gives $$\\lim_n\\mathbb E[X_n^2]=\\mathbb E[U^2]$$ $$=\\int_0^1x^2\\,dx=\\frac13.$$"
      ]
    ],
    "why": "For $\\mu_n=\\delta_{1/n}$ and $\\mu=\\delta_0$, weak convergence holds, but $\\mu_n(\\{0\\})=0$ and $\\mu(\\{0\\})=1$. Also unbounded continuous tests are not covered: if $Y_n=n$ with probability $1/n$ and zero otherwise, $Y_n$ converges in law to zero but $\\mathbb E[Y_n]=1$.",
    "intuition": "Weak convergence tests a law using continuous bounded probes. Indicators are discontinuous at boundaries, but if the limiting law places no mass there, smoothing the jump does not change its limiting integral."
  },
  "uniform-expect": {
    "title": "Integrate an L¹ limit that is not a uniform limit",
    "goal": "Suppose $f_n\\to f$ in $L^1(\\mathbb R)$. For fixed $\\xi\\in\\mathbb R$, may we pass to the limit in the Fourier transforms?",
    "steps": [
      [
        "Identify the relevant operator",
        "Define $$T_\\xi(h)=\\int_{\\mathbb R}h(x)e^{-i\\xi x}\\,dx.$$ This maps $L^1(\\mathbb R)$ linearly into $\\mathbb C$ and is well-defined because the exponential has modulus one."
      ],
      [
        "Check boundedness in the right norm",
        "For any $h\\in L^1$, $$|T_\\xi(h)|\\le\\int_{\\mathbb R}|h(x)|\\,dx=\\|h\\|_1.$$ Thus $\\|T_\\xi\\|\\le1$, independently of $\\xi$."
      ],
      [
        "Commute the operator with the limit",
        "The bounded linear operator theorem gives $$\\lim_n T_\\xi(f_n)=T_\\xi(f).$$ In fact the estimate is uniform in frequency: $$\\sup_\\xi|\\widehat f_n(\\xi)-\\widehat f(\\xi)|\\le\\|f_n-f\\|_1\\to0.$$ For $f_n=\\mathbf1_{[0,1-1/n]}$, this error is at most $1/n$ even though uniform convergence of the original functions fails."
      ]
    ],
    "why": "The topology matters. Differentiation on $C^1([0,1])$ equipped with the supremum norm is unbounded: $f_n(x)=\\sin(nx)/n\\to0$ in that norm, but $f_n'(0)=1$. Continuity of the operator is precisely what makes passing through a norm limit legitimate.",
    "intuition": "Choose the norm that measures the error you can control. A bounded linear operator can amplify that error by at most a fixed factor; a vanishing input error must therefore produce a vanishing output error."
  },
  "dini": {
    "title": "Upgrade pointwise convergence before integrating",
    "goal": "Let $$f_n(x)=\\sqrt{x+1/n},\\quad 0\\le x\\le1.$$ We want to integrate the limit and justify uniform convergence without calculating a supremum explicitly.",
    "steps": [
      [
        "Check compactness and continuity",
        "The domain $[0,1]$ is compact. Every $f_n$ is continuous, and the pointwise limit $f(x)=\\sqrt x$ is continuous as well."
      ],
      [
        "Check monotonicity and invoke Dini",
        "For each $x$, $1/(n+1)<1/n$ and the square root is increasing. Thus $f_{n+1}(x)\\le f_n(x)$ and $f_n\\downarrow f$. Dini's theorem upgrades the pointwise convergence to uniform convergence: $$\\|f_n-f\\|_\\infty\\to0.$$"
      ],
      [
        "Use the uniform integral theorem",
        "The functions are Riemann integrable on a finite interval, so $$\\lim_n\\int_0^1\\sqrt{x+1/n}\\,dx$$ $$=\\int_0^1\\sqrt x\\,dx=\\frac23.$$ Dini provides the missing uniform convergence; the uniform integral theorem supplies the interchange."
      ]
    ],
    "why": "Continuity of the limit cannot be omitted: $x^n$ decreases on $[0,1]$ to a discontinuous limit, and $\\sup_{x<1}x^n=1$. Monotonicity cannot be dropped either: $n x(1-x)^n$ tends pointwise to zero on $[0,1]$ but at $x=1/(n+1)$ its values tend to $e^{-1}$.",
    "intuition": "For a given error tolerance, each point is eventually good. Continuity makes the good region open, monotonicity makes it grow, and compactness says finitely many such regions already cover the whole space."
  },
  "stokes": {
    "title": "Move a boundary limit through an infinite sum",
    "goal": "Evaluate $$\\lim_{x\\downarrow0}\\sum_{n=1}^\\infty\\frac{\\sin(nx)}{n^3x}.$$ The summands appear to have a singularity at zero, and the sum is infinite.",
    "steps": [
      [
        "Compute the limit of each term",
        "For fixed $n$, $\\sin(nx)/(nx)\\to1$, so $$\\ell_n=\\lim_{x\\downarrow0}\\frac{\\sin(nx)}{n^3x}=\\frac1{n^2}.$$"
      ],
      [
        "Check uniform convergence on a punctured neighborhood",
        "For every $x>0$, $|\\sin(nx)|\\le n x$. Therefore $$\\left|\\frac{\\sin(nx)}{n^3x}\\right|\\le\\frac1{n^2}.$$ The majorant is summable. The M-test gives uniform convergence even arbitrarily close to zero, where the summands were initially undefined."
      ],
      [
        "Apply the uniform series limit theorem",
        "All finite term limits exist, and the uniform convergence condition is satisfied. Hence $$\\lim_{x\\downarrow0}\\sum_{n=1}^\\infty\\frac{\\sin(nx)}{n^3x}$$ $$=\\sum_{n=1}^\\infty\\ell_n=\\frac{\\pi^2}6.$$ The theorem guarantees the result without finding a closed form for the function series."
      ]
    ],
    "why": "On $(0,1)$, take $f_n(x)=x(1-x)^{n-1}$. Each $f_n(x)\\to0$ as $x\\downarrow0$, but $\\sum_{n=1}^\\infty f_n(x)=1$ for every $x>0$. The two operations yield different answers because the convergence is not uniform near zero.",
    "intuition": "Split an infinite series into a finite head, which can be passed through a limit without trouble, and a tail. Uniform convergence means the tail is small even as the argument approaches the boundary."
  },
  "riemann-lebesgue": {
    "title": "Show a rapidly oscillating average vanishes",
    "goal": "Given $f\\in L^1(0,1)$, show $$\\lim_{n\\to\\infty}\\int_0^1 f(x)\\sin(2\\pi nx)\\,dx=0.$$ Pointwise convergence of the sine factors fails, so dominated convergence is not the explanation.",
    "steps": [
      [
        "Rewrite as a Fourier integral",
        "Extend $f$ by zero off $(0,1)$ to obtain an $L^1(\\mathbb R)$ function $\\tilde f$. If $f$ is real, the integral is the imaginary part of $$\\int_{\\mathbb R}\\tilde f(x)e^{2\\pi i n x}\\,dx.$$ For complex $f$, use the difference of the positive and negative frequency exponential integrals divided by $2i$."
      ],
      [
        "Identify the cancellation estimate",
        "For a constant times an interval indicator, $$\\left|\\int_a^b e^{2\\pi i n x}\\,dx\\right|\\le\\frac1{\\pi n}.$$ Finite linear combinations therefore have vanishing Fourier integrals. Approximation in $L^1$ controls the error by its norm, uniformly in $n$."
      ],
      [
        "Invoke the lemma",
        "Since $|2\\pi n|\\to\\infty$ and $\\tilde f\\in L^1$, Riemann–Lebesgue gives the desired limit zero. For example, if $f(x)=x^{-1/2}$, it is unbounded but integrable ($\\int_0^1 f=2$), and the conclusion still holds."
      ]
    ],
    "why": "Absolute integrability is a sufficient condition, not a necessary condition for every oscillatory integral. However, replacing an $L^1$ density by an arbitrary finite measure breaks the statement: for a point mass $\\delta_0$, $\\int e^{-i\\xi x}\\,d\\delta_0(x)=1$ at every frequency.",
    "intuition": "An oscillating exponential has nearly cancelling positive and negative contributions over each fixed interval. L¹ approximation transfers this cancellation from step functions to rough integrable functions without ever needing a pointwise limit of the oscillations."
  },
  "arzela": {
    "title": "Extract a uniformly convergent subsequence to pass through an integral",
    "goal": "Suppose $u_n:[0,1]\\to\\mathbb R$ satisfy $u_n(0)=0$, $|u_n(x)-u_n(y)|\\le2|x-y|$, and $$\\int_0^1u_n(x)\\,dx=1/2.$$ Show that some continuous limit function inherits the integral constraint. We are not given pointwise or uniform convergence.",
    "steps": [
      [
        "Verify the compactness hypotheses",
        "The interval is compact metric. The Lipschitz bound implies continuity and equicontinuity: for any $\\varepsilon>0$, take $\\delta=\\varepsilon/2$. It also implies pointwise boundedness because $$|u_n(x)|\\le2x\\le2.$$"
      ],
      [
        "Extract a subsequence",
        "Arzelà–Ascoli gives a subsequence $u_{n_j}$ and $u\\in C([0,1])$ with $$\\|u_{n_j}-u\\|_\\infty\\to0.$$ This is subsequential convergence only; the theorem makes no claim about the entire sequence."
      ],
      [
        "Pass to the limit in constraints",
        "The uniform integral theorem yields $$\\int_0^1u(x)\\,dx$$ $$=\\lim_j\\int_0^1u_{n_j}(x)\\,dx=\\frac12.$$ Evaluation at zero also commutes with the uniform limit, so $u(0)=0$. Passing the pointwise inequality to the limit gives $|u(x)-u(y)|\\le2|x-y|$. Thus the limit remains in the original constraint set."
      ]
    ],
    "why": "The family $u_n(x)=x^n$ on $[0,1]$ is uniformly bounded but not equicontinuous at $1$. Every subsequence has the same discontinuous pointwise limit, so none can converge uniformly. Boundedness alone does not give compactness in the space of continuous functions.",
    "intuition": "Equicontinuity gives one common scale at which every graph changes little. On a compact domain, finitely many sample points then control the whole graph; diagonal extraction of their values turns into uniform convergence."
  }
});
