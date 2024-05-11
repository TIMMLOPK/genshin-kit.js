import { checkServerRegion, CookieToObj, CookieFormatter, CookieObjToString } from '../dist';

test("Check server_region by uid", () => {
    const asia_uid = 80000000;
    const asia2_uid = 180000000;
    const sar_uid = 90000000;
    const eu_uid = 70000000;
    const na_uid = 60000000;
    const invalid_uid = 20000000;

    expect(checkServerRegion(asia_uid)).toBe("os_asia");
    expect(checkServerRegion(asia2_uid)).toBe("os_asia");
    expect(checkServerRegion(sar_uid)).toBe("os_cht");
    expect(checkServerRegion(eu_uid)).toBe("os_euro");
    expect(checkServerRegion(na_uid)).toBe("os_usa");
    expect(() => checkServerRegion(invalid_uid)).toThrowError("Invalid UID");
});

test("Cookie Parser", () => {
    const testCookie = "ltoken=123456789; ltuid=123456789;";
    const testCookie2 = "ltoken_v2=123456789; ltuid_v2=123456789;";
    const testCookie3 = " ltoken=123456789; ltuid=123456789;  ";
    const testCookie4 = "ltoken=123456789; ltuid=123456789; ltoken_v2=123456789=; ltuid_v2=123456789;";

    expect(CookieToObj(testCookie)).toStrictEqual({ ltoken: "123456789", ltuid: "123456789" });
    expect(CookieToObj(testCookie2)).toStrictEqual({ ltoken_v2: "123456789", ltuid_v2: "123456789" });
    expect(CookieToObj(testCookie3)).toStrictEqual({ ltoken: "123456789", ltuid: "123456789" });
    expect(CookieToObj(testCookie4)).toStrictEqual({ ltoken: "123456789", ltuid: "123456789", ltoken_v2: "123456789=", ltuid_v2: "123456789" });
});

test("Cookie Formatter", () => {
    const ltoken = "123456789";
    const ltuid = "123456789";

    expect(CookieFormatter(ltoken, ltuid)).toBe("ltoken=123456789; ltuid=123456789;");
});

test("Cookie Object to String", () => {
    const cookieObj = {
        ltoken: "123456789",
        ltuid: "123456789"
    };

    expect(CookieObjToString(cookieObj)).toBe("ltoken=123456789; ltuid=123456789;");
});



