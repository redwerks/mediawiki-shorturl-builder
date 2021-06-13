import StepArticlepath from '../image/step-articlepath.png';
import StepConfigure from '../image/step-configure.png';
import StepDiscovery from '../image/step-discovery.png';
import StepInstall from '../image/step-install.png';
import StepUrl from '../image/step-url.png';
import { Layout } from '../layout/Layout';
import { MediaBox } from '../ui';
import { MediaBoxList } from '../ui/MediaBox';
import { UrlForm } from '../urlform/UrlForm';

const HomeRoute = () => {
  return (
    <Layout>
      <UrlForm />

      <MediaBoxList className="mediaboxlist">
        <MediaBox
          thumb={StepInstall}
          no={1}
          title="Install and configure MediaWiki"
        >
          Our tool works on publicly visible MediaWiki installations, so if you
          haven't already installed MediaWiki do that first.
        </MediaBox>
        <MediaBox thumb={StepUrl} no={2} title="Tell us where your wiki is">
          Now that you have a wiki, grab the url to a page on your wiki. It
          doesn't matter what page you pick, we'll fetch that URL and discover
          the location to your wiki's API ourselves.
        </MediaBox>
        <MediaBox thumb={StepDiscovery} no={3} title="Automatic discovery">
          Once we've found your wiki's API we'll try to automatically discover
          what type of server you're running, your script path, and any other
          technical information we need to help you configure your wiki.
        </MediaBox>
        <MediaBox thumb={StepArticlepath} no={4} title="Enter an article path">
          We'll pick a default article path we think you might like. If it's
          wrong enter a new one and we'll update the config we give you.
        </MediaBox>
        <MediaBox thumb={StepConfigure} no={5} title="Configure your wiki">
          We'll generate the complete server and MediaWiki configuration you
          need to setup short URLs, just follow the instructions and your wiki
          will be running with short URLs.
        </MediaBox>
      </MediaBoxList>
    </Layout>
  );
};

export default HomeRoute;
