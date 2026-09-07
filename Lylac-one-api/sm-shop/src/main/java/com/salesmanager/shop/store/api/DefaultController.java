package com.salesmanager.shop.store.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Controller providing default endpoints for the API, such as health or version checks.
 * This acts as a generic entry point for the application.
 */
@Controller
public class DefaultController {
	

	@Autowired
	private Environment env;
	
	/**
	 * Returns the application version and build timestamp.
	 *
	 * @param model the UI model
	 * @return a JSON string containing version and build information
	 */
	@GetMapping(value = "/")
	public @ResponseBody String version(Model model) {

		return "{\"version\":\""+  env.getProperty("application-version")  +"\", \"build\":\"" + env.getProperty("build.timestamp") + "\"}";
	}

}
