package com.european_leagues.utils.enums;

import lombok.ToString;

@ToString
public enum Site {
    HOME("HOME"),
    VISITOR("VISITOR");

    private String site;
    private Site(String site){this.site = site;}
}
