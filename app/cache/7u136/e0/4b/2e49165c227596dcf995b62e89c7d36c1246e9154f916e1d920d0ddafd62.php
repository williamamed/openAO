<?php

/* @systemBundle/error/index.html.twig */
class __TwigTemplate_e04b2e49165c227596dcf995b62e89c7d36c1246e9154f916e1d920d0ddafd62 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<!DOCTYPE html>
<html lang=\"en\">

<head>
\t<meta charset=\"utf-8\">
\t<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">
\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
\t<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

\t<title>";
        // line 10
        echo twig_escape_filter($this->env, (isset($context["title"]) ? $context["title"] : null), "html", null, true);
        echo "</title>

\t<!-- Google font -->
\t
\t<!-- Custom stlylesheet -->
\t<link type=\"text/css\" rel=\"stylesheet\" href=\"";
        // line 15
        echo twig_escape_filter($this->env, call_user_func_array($this->env->getFunction('asset')->getCallable(), array("Raptor/v3/css/notfound.css")), "html", null, true);
        echo "\" />

</head>

<body>

\t<div id=\"notfound\">
\t\t<div class=\"notfound\">
\t\t\t<div class=\"notfound-404\">
\t\t\t\t<h1>Oops!</h1>
\t\t\t</div>
\t\t\t<h2>";
        // line 26
        echo twig_escape_filter($this->env, (isset($context["title"]) ? $context["title"] : null), "html", null, true);
        echo "</h2>
\t\t\t<p>";
        // line 27
        echo twig_escape_filter($this->env, (isset($context["body"]) ? $context["body"] : null), "html", null, true);
        echo "</p>
\t\t\t<a href=\"";
        // line 28
        echo twig_escape_filter($this->env, (isset($context["uri"]) ? $context["uri"] : null), "html", null, true);
        echo "\">Ir a la página principal</a>
\t\t</div>
\t</div>

</body><!-- This templates was made by Colorlib (https://colorlib.com) -->

</html>";
    }

    public function getTemplateName()
    {
        return "@systemBundle/error/index.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  60 => 28,  56 => 27,  52 => 26,  38 => 15,  30 => 10,  19 => 1,);
    }
}
