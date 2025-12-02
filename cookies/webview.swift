import Cocoa
import WebKit

class AppDelegate: NSObject, NSApplicationDelegate, WKNavigationDelegate {
    var window: NSWindow!
    var webView: WKWebView!

    func applicationDidFinishLaunching(_ notification: Notification) {
        let windowStyle = NSWindow.StyleMask.titled.union(.closable).union(.resizable)
        let windowRect = NSRect(x: 0, y: 0, width: 1024, height: 768)
        window = NSWindow(contentRect: windowRect, styleMask: windowStyle, backing: .buffered, defer: false)
        window.center()
        window.title = "Safari Webview Simulator"
        window.makeKeyAndOrderFront(nil)

        let config = WKWebViewConfiguration()
        webView = WKWebView(frame: windowRect, configuration: config)
        webView.navigationDelegate = self
        window.contentView = webView

        // Get TLD from environment variable
        let env = ProcessInfo.processInfo.environment
        let tld = env["TLD"] ?? "corp"
        let urlString = "https://abc.tao.\(tld):3002"

        // Load the URL
        if let url = URL(string: urlString) {
            let request = URLRequest(url: url)
            webView.load(request)
        }
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }

    // Ignore SSL certificate errors
    func webView(_ webView: WKWebView, didReceive challenge: URLAuthenticationChallenge, completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Void) {
        if challenge.protectionSpace.authenticationMethod == NSURLAuthenticationMethodServerTrust {
            if let trust = challenge.protectionSpace.serverTrust {
                completionHandler(.useCredential, URLCredential(trust: trust))
                return
            }
        }
        completionHandler(.performDefaultHandling, nil)
    }
}

let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
app.run()
