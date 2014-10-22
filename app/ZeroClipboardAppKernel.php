<?php

use Symfony\Component\HttpKernel\Kernel;
use Symfony\Component\Config\Loader\LoaderInterface;

class ZeroClipboardAppKernel extends Kernel
{
    public function registerBundles()
    {
        $bundles = array(
            new Symfony\Bundle\FrameworkBundle\FrameworkBundle(),
            new Symfony\Bundle\SecurityBundle\SecurityBundle(),
            new Symfony\Bundle\TwigBundle\TwigBundle(),
            new Symfony\Bundle\AsseticBundle\AsseticBundle(),
            new Sensio\Bundle\FrameworkExtraBundle\SensioFrameworkExtraBundle(),
            new Anezi\Bundle\JQueryBundle\JQueryBundle(),
            new Anezi\Bundle\BootstrapBundle\BootstrapBundle(),
            new Anezi\Bundle\ZeroClipboardBundle\ZeroClipboardBundle(),
            new Anezi\Bundle\HighlightBundle\HighlightBundle(),
        );

        if (in_array($this->getEnvironment(), array('dev', 'test'))) {
            $bundles[] = new Symfony\Bundle\WebProfilerBundle\WebProfilerBundle();
            $bundles[] = new Sensio\Bundle\DistributionBundle\SensioDistributionBundle();
        }

        return $bundles;
    }

    public function registerContainerConfiguration(LoaderInterface $loader)
    {
        $loader->load(__DIR__.'/config/config_'.$this->getEnvironment().'.yml');
    }

    public function getCacheDir()
    {
        return $this->getVarDir() . '/cache/' . $this->environment;
    }

    public function getLogDir()
    {
        return $this->getVarDir() . '/logs';
    }

    private function getVarDir()
    {
        return dirname($this->rootDir) . '/var';
    }
}
